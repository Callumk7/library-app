import { queryClient } from "@/lib/clients/react-query";
import {
	CollectionWithGamesAndGenres,
	CollectionWithGamesGenresPlaylists,
	Game,
	IGDBGame,
	UserGameCollection,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const postGameToCollection = async (gameId: number, userId: string) => {
	const res = await fetch(`/api/collection?gameId=${gameId}&userId=${userId}`, {
		method: "POST",
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	console.log(data)
	return data as UserGameCollection;
};

export const useAddToCollectionMutation = (userId: string) => {
	const router = useRouter();
	const addMutation = useMutation({
		mutationFn: (gameId: number) => {
			console.log("adding to collection..");
			return postGameToCollection(gameId, userId);
		},

		onSuccess: async (collectionEntry) => {
			console.log(`success ${collectionEntry.gameId}`);
			queryClient.invalidateQueries(["collection", userId]);
			router.refresh();
			const res = await fetch("/api/revalidate?path=/collection/[userId]")
			const body = await res.json();
			console.log(body);
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
	const router = useRouter();
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

		onSettled: async () => {
			console.log("settled");
			queryClient.invalidateQueries({ queryKey: ["collection", userId] });
			router.refresh();
			const res = await fetch("/api/revalidate?path=/collection/[userId]")
			const body = await res.json();
			console.log(body);
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
	const router = useRouter()
	const deleteManyMutation = useMutation({
		mutationFn: (gameIds: number[]) => {
			return deleteManyGamesFromCollection(gameIds, userId);
		},
		onMutate: (gameIds: number[]) => {
			console.log("bulk deleting games");
			queryClient.cancelQueries(["collection", userId]);

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
			queryClient.setQueryData(["collection", userId], newState);
		},

		onSuccess: () => {
			console.log("mutation successful");
		},

		onSettled: async () => {
			console.log("settled");
			queryClient.invalidateQueries({ queryKey: ["collection", userId] });
			router.refresh();
			const res = await fetch("/api/revalidate?path=/collection/[userId]")
			const body = await res.json();
			console.log(body);
		},
	});

	return deleteManyMutation;
};

const patchToggleGameAsPlayed = async (
	userId: string,
	gameId: number,
	played: boolean
) => {
	const res = await fetch(`/api/collection/games/${gameId}?userId=${userId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ played: played }),
	});

	if (!res.ok) {
		throw new Error("network response was not ok");
	}

	const data = await res.json();
	return data as Game;
};

export const useTogglePlayed = (userId: string) => {
	const markAsPlayedMutation = useMutation({
		mutationFn: (gameId: number) => {
			console.log("toggling played");

			const prevState = queryClient.getQueryData([
				"collection",
				userId,
				gameId,
			]) as CollectionWithGamesAndGenres;

			const played = prevState.played;
			console.log(played)
			return patchToggleGameAsPlayed(userId, gameId, played);
		},

		onMutate: (gameId) => {
			const prevState = queryClient.getQueryData([
				"collection",
				userId,
				gameId,
			]) as CollectionWithGamesAndGenres;

			const played = !prevState.played;
			const newState = prevState;
			newState.played = played;

			queryClient.setQueryData(["collection", userId, gameId], newState);
		},

		onSuccess: ({gameId}) => {
			console.log("played toggled successfully");
			queryClient.invalidateQueries(["collection", userId, gameId]);
		},
	});

	return markAsPlayedMutation;
};

const patchToggleGameAsCompleted = async (
	userId: string,
	gameId: number,
	completed: boolean
) => {
	const res = await fetch(`/api/collection/games/${gameId}?userId=${userId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ completed: completed }),
	});

	if (!res.ok) {
		throw new Error("network response was not ok");
	}

	const data = await res.json();
	return data as Game;
};

export const useToggleCompleted = (userId: string) => {
	const markAsPlayedMutation = useMutation({
		mutationFn: (gameId: number) => {
			console.log("toggling played");

			const prevState = queryClient.getQueryData([
				"collection",
				userId,
			]) as CollectionWithGamesAndGenres[];

			const completed = prevState.find((game) => game.gameId === gameId)!.completed;
			console.log(completed)
			return patchToggleGameAsCompleted(userId, gameId, completed);
		},

		onMutate: (gameId) => {
			queryClient.cancelQueries(["collection", userId]);
			const prevState = queryClient.getQueryData([
				"collection",
				userId,
			]) as CollectionWithGamesAndGenres[];

			const newState = prevState.map((game) => {
				if (game.gameId === gameId) {
					return { ...game, played: !game.played };
				}
				return game;
			});

			queryClient.setQueryData(["collection", userId], newState);
		},

		onSuccess: () => {
			console.log("completed toggled successfully");
			queryClient.invalidateQueries(["collection", userId]);
		},
	});

	return markAsPlayedMutation;
};

// Add a game to the database (from an external source)
const saveGameToDatabase = async (game: IGDBGame) => {
    const res = await fetch("/api/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });

	if (!res.ok) {
		throw new Error("network response was not ok");
	}

	const data = await res.json();
	return data as IGDBGame;
}

export const useSaveGame = (game: IGDBGame) => {
	const saveGameMutation = useMutation({
		mutationFn: () => saveGameToDatabase(game),
		onSuccess: () => {
			console.log("successfully saved")
		}
	})

	return saveGameMutation;
}
