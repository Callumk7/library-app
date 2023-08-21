import { queryClient } from "@/lib/db/query";
import { CollectionWithGamesGenresPlaylists, UserGameCollection } from "@/types";
import { useMutation } from "@tanstack/react-query";

const postGameToCollection = async (gameId: number, userId: string) => {
	const res = await fetch(`/api/collection?gameId=${gameId}&userId=${userId}`, {
		method: "POST",
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as UserGameCollection;
};

export const useAddToCollectionMutation = (userId: string) => {
	const addMutation = useMutation({
		mutationFn: (gameId: number) => {
			console.log("adding to collection..");
			return postGameToCollection(gameId, userId);
		},

		onSuccess: (collectionEntry) => {
			console.log(`success ${collectionEntry.gameId}`);
			queryClient.invalidateQueries(["collection", userId]);
		},
	});

	return addMutation;
};

const deleteGameFromCollection = async (gameId: number, userId: string) => {
	const res = await fetch(`/api/collection/?gameId=${gameId}&userId=${userId}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as UserGameCollection;
};

export const useDeleteMutation = (userId: string) => {
	const deleteMutation = useMutation({
		mutationFn: (gameId: number) => {
			console.log("deleting game from collection");
			return deleteGameFromCollection(gameId, userId);
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
			queryClient.cancelQueries(["collection", userId]);
			queryClient.setQueryData(["collection", userId], newState);
		},

		onSuccess: () => {
			console.log("mutation successful");
		},

		onSettled: () => {
			console.log("settled");
			queryClient.invalidateQueries({ queryKey: ["collection", userId] });
		},
	});

	return deleteMutation;
};

const deleteManyGamesFromCollection = async (gameIds: number[], userId: string) => {
	if (gameIds.length === 0) {
		throw new Error("No game ids provided");
	}
	const body = JSON.stringify(gameIds);
	const res = await fetch(`/api/collection?userId=${userId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: body,
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as UserGameCollection;
};

export const useDeleteManyMutation = (userId: string) => {
	const deleteManyMutation = useMutation({
		mutationFn: (gameIds: number[]) => {
			return deleteManyGamesFromCollection(gameIds, userId);
		},
		onMutate: (gameIds: number[]) => {
			console.log("bulk deleting games");
			queryClient.invalidateQueries(["collection", userId]);

			const oldState = queryClient.getQueryData([
				"collection",
				userId,
			]) as CollectionWithGamesGenresPlaylists[];

			console.log("setting new state...");
			const newState = oldState.filter((game) => {
				if (gameIds.includes(game.gameId)) {
					return false;
				} else {
					return true;
				}
			});
			queryClient.cancelQueries(["collection", userId]);
			queryClient.setQueryData(["collection", userId], newState);
		},

		onSuccess: () => {
			console.log("mutation successful");
		},

		onSettled: () => {
			console.log("settled");
			queryClient.invalidateQueries({ queryKey: ["collection", userId] });
		},
	});

	return deleteManyMutation;
};
