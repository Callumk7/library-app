import { prisma } from "@/lib/db/prisma";
import { Playlist } from "@prisma/client";

export async function getPlaylists(userId: string): Promise<Playlist[]> {
	console.time("get playlists");
	const getPlaylists = await prisma.playlist.findMany({
		where: {
			userId,
		},
	});

	console.timeEnd("get playlists");
	return getPlaylists;
}

export async function getPlaylist(playlistId: number) {
	const getPlaylist = await prisma.playlist.findFirst({
		where: {
			id: playlistId,
		},
		select: {
			id: true,
			name: true,
		},
	});

	return getPlaylist;
}

export async function getPlaylistWithGames(playlistId: number) {
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

export async function getPlaylistTitles(userId: string) {
	console.time("get playlist titles");
	const getPlaylistTitles = await prisma.playlist.findMany({
		where: {
			userId,
		},
		select: {
			id: true,
			name: true,
		},
	});

	return getPlaylistTitles;
}

export async function getPlaylistsWithGames(userId: string) {
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

export async function getGamesInPlaylist(playlistId: number) {
	console.time("get games in playlist");
	const getGames = await prisma.game.findMany({
		where: {
			playlists: {
				some: {
					playlistId,
				},
			},
		},
		include: {
			genres: {
				include: {
					genre: true,
				},
			},
			cover: true,
		},
	});

	console.timeEnd("get games in playlist");
	return getGames;
}

export async function deletePlaylist(playlistId: number) {
	const deletedPlaylist = await prisma.playlist.delete({
		where: {
			id: playlistId,
		},
	});

	return deletedPlaylist;
}
