import {
	fetchCollectionGameIds,
	fetchFullCollection,
} from "@/features/collection/queries";
import {
	fetchGamePlaylists,
	fetchGamesFromPlaylist,
	fetchUserPlaylists,
} from "@/features/playlists/queries";
import {
	CollectionWithGamesGenresPlaylists,
	GameWithCoverAndGenres,
	PlaylistWithGames,
} from "@/types";
import { Playlist } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useCollectionQuery = (
	userId: string,
	initialData?: CollectionWithGamesGenresPlaylists[]
) => {
	const collectionQuery = useQuery({
		queryKey: ["collection", userId],
		queryFn: () => fetchFullCollection(userId),
		initialData: initialData,
	});

	return collectionQuery;
};

export const useCollectionGameIdsQuery = (userId: string, initialData?: number[]) => {
	const collectionIdsQuery = useQuery({
		queryKey: ["collection", userId, { selectIds: true }],
		queryFn: () => fetchCollectionGameIds(userId),
		initialData: initialData,
	});

	return collectionIdsQuery;
};

export const usePlaylistQuery = (userId: string, initialData?: PlaylistWithGames[]) => {
	const playlistQuery = useQuery({
		queryKey: ["playlists", userId],
		queryFn: () => fetchUserPlaylists(userId),
		initialData: initialData,
	});

	return playlistQuery;
};

export const useGamePlaylistsQuery = (
	userId: string,
	gameId: number,
	initialData?: Playlist[]
) => {
	const gamePlaylistQuery = useQuery({
		queryKey: ["playlists", userId, gameId],
		queryFn: () => fetchGamePlaylists(gameId),
		initialData: initialData,
	});

	return gamePlaylistQuery;
};

export const usePlaylistGamesQuery = (
	userId: string,
	playlistId: number,
	initialData?: GameWithCoverAndGenres[]
) => {
	const playlistGamesQuery = useQuery({
		queryKey: ["playlists", playlistId, userId],
		queryFn: () => fetchGamesFromPlaylist(userId, playlistId),
		initialData: initialData,
	});

	return playlistGamesQuery;
};
