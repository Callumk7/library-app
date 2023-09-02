import { prisma } from "@/lib/clients/prisma";
import {
	GameWithCoverAndGenres,
	PlaylistWithGames,
	PlaylistWithGamesCoverGenres,
} from "@/types";
import { Playlist } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

///
/// GET A USER'S PLAYLISTS WITH GAMES AND GENRES
///
export async function getAllPlaylistsWithGames(userId: string) {
	console.time("get playlists with games");
	const getPlaylists = await prisma.playlist.findMany({
		where: {
			userId,
		},
		include: {
			games: {
				include: {
					game: {
						include: {
							cover: true,
						},
					},
				},
			},
		},
	});

	console.timeEnd("get playlists with games");
	return getPlaylists;
}

async function fetchUserPlaylists(userId: string): Promise<PlaylistWithGames[]> {
	const res = await fetch(`/api/playlists?userId=${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as PlaylistWithGames[];
}

export const usePlaylistQuery = (userId: string, initialData?: PlaylistWithGames[]) => {
	const playlistQuery = useQuery({
		queryKey: ["playlists", userId],
		queryFn: () => fetchUserPlaylists(userId),
		initialData: initialData,
	});

	return playlistQuery;
};

///
/// GET A GAME'S COMPLETE LIST OF PLAYLISTS
///
export async function getGamePlaylists(gameId: number) {
	const getGamePlaylists = await prisma.playlist.findMany({
		where: {
			games: {
				some: {
					gameId: gameId,
				},
			},
		},
	});

	return getGamePlaylists;
}

async function fetchGamePlaylists(gameId: number): Promise<Playlist[]> {
	const res = await fetch(`/api/games/playlists?gameId=${gameId}`, {
		method: "GET",
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as Playlist[];
}

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

/// GET A SPECIFIC PLAYLIST, WITH GAMES
export async function getPlaylistWithGames(
	playlistId: number
): Promise<PlaylistWithGamesCoverGenres | null> {
	console.time("get playlist with games");
	const getPlaylist = await prisma.playlist.findUnique({
		where: {
			id: playlistId,
		},
		include: {
			games: {
				include: {
					game: {
						include: {
							genres: {
								include: {
									genre: true,
								},
							},
							cover: true,
						},
					},
				},
			},
		},
	});

	console.timeEnd("get playlist with games");
	return getPlaylist;
}

const fetchPlaylistWithGames = async (
	userId: string,
	playlistId: number
): Promise<PlaylistWithGamesCoverGenres> => {
	// this needs to be updated! this is just games not playlist with games
	const res = await fetch(`/api/playlists?userId=${userId}&playlistId=${playlistId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as PlaylistWithGamesCoverGenres;
}

export const usePlaylistWithGamesQuery = (
	userId: string,
	playlistId: number,
	initialData?: PlaylistWithGamesCoverGenres
) => {
	const playlistGamesQuery = useQuery({
		queryKey: ["playlists", playlistId, userId],
		queryFn: () => fetchPlaylistWithGames(userId, playlistId),
		initialData: initialData,
	});

	return playlistGamesQuery;
};

export async function getGamesFromPlaylist(
	playlistId: number
): Promise<GameWithCoverAndGenres[]> {
	const getGames = await prisma.game.findMany({
		where: {
			playlists: {
				some: {
					playlistId: playlistId,
				},
			},
		},
		include: {
			cover: true,
			genres: {
				include: {
					genre: true,
				},
			},
		},
	});

	return getGames;
}

const fetchGamesFromPlaylist = async (userId: string, playlistId: number)  => {
	const res = await fetch(`/api/playlists?userId=${userId}&playlistId=${playlistId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as GameWithCoverAndGenres[];
}

export const useGamesFromPlaylistQuery = (userId: string, playlistId: number, initialData?: GameWithCoverAndGenres[]) => {
	const gamesFromPlaylistQuery = useQuery({
		queryKey: ["playlists", playlistId, userId],
		queryFn: () => fetchGamesFromPlaylist(userId, playlistId),
		initialData: initialData
	});

	return gamesFromPlaylistQuery;
}

///
/// MISC PLAYLIST PRISMA FUNCTIONS
///
/// GET USER PLAYLISTS WITH GAME COUNT
export async function getPlaylists(userId: string) {
	console.time("get playlists");
	const getPlaylists = await prisma.playlist.findMany({
		where: {
			userId,
		},
		include: {
			_count: {
				select: { games: true },
			},
		},
	});

	console.timeEnd("get playlists");
	return getPlaylists;
}
