import { prisma } from "../prisma";

export async function getPlaylists(userId: string) {
	console.time("get playlists");
	const getPlaylists = await prisma.playlist.findMany({
		where: {
			userId,
		},
	});

	console.timeEnd("get playlists");
	return getPlaylists;
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
