import { prisma } from "@/lib/clients/prisma";

export async function getUserGenres(userId: string): Promise<string[]> {
	console.time("get user genres");
	const findUserGames = await prisma.userGameCollection.findMany({
		where: {
			userId: {
				equals: userId,
			},
		},
		select: {
			gameId: true,
		},
	});

	const gameIds = findUserGames.map((ug) => ug.gameId);

	const findUserGenres = await prisma.genre.findMany({
		where: {
			games: {
				some: {
					gameId: {
						in: gameIds,
					},
				},
			},
		},
		select: {
			name: true,
		},
	});

	// return a string array of genre names
	const genreArray = findUserGenres.map((g) => g.name);
	console.timeEnd("get user genres");
	return genreArray;
}
