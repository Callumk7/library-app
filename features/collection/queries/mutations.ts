import { queryClient } from "@/lib/db/query";
import { CollectionWithGamesGenresPlaylists } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useDeleteMutation = (userId: string) => {
	const deleteMutation = useMutation({
		mutationFn: (gameId: number) => {
			return fetch(`/api/collection/games/${gameId}`, {
				method: "DELETE",
			});
		},

		onMutate: (gameId: number) => {
			console.log(`mutating ${gameId}`);

			console.log("invalidate fetches..");
			queryClient.invalidateQueries(["collection", userId]);

			// we can use old state for an optimistic update
			const oldState = queryClient.getQueryData([
				"collection",
				userId,
			]) as CollectionWithGamesGenresPlaylists[];

			console.log("setting new state..");
			const newState = oldState.filter((entry) => entry.gameId !== gameId);
			queryClient.setQueryData(["collection", userId], newState);
		},

		onSuccess: () => {
			console.log("mutation successful");
		},

		onSettled: () => {
			console.log("settled")
			queryClient.invalidateQueries({ queryKey: ["collection", userId] });
		},
	});

	return deleteMutation;
};
