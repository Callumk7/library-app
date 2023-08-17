import { queryClient } from "@/lib/db/query";
import { useMutation } from "@tanstack/react-query";

export const useAddToCollectionMutation = (userId: string) => {
	const addMutation = useMutation({
		mutationFn: (gameId: number) => {
			console.log("adding to collection..");
			return fetch(`/api/collection?gameId=${gameId}`, {
				method: "POST",
			});
		},

		onSuccess: (data) => {
			console.log(`success ${data.status}`);
			queryClient.invalidateQueries(["collection", userId]);
		},
	});

	return addMutation;
};
