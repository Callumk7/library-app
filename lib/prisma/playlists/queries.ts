import { prisma } from "../client";

export async function getPlaylists(userId: string) {
	console.time("get playlists");
	const getPlaylists = await prisma.playlist.findMany({
		where: {
			userId,
		},
		include: {
			games: true,
		},
	});

	console.timeEnd("get playlists");
	return getPlaylists;
}
