import { prisma } from "../prisma";

export async function getUserGenres(userId: string) {
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
	console.timeEnd("get user genres");
	return findUserGenres;
}
