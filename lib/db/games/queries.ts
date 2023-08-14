import { prisma } from "../prisma";

export async function getRecentGames(count: number) {
	const getGames = await prisma.userGameCollection.findMany({
		take: count,
		orderBy: {
			createdAt: "desc",
		},
		select: {
			game: {
				select: {
					cover: true,
					title: true,
				},
			},
		},
	});
	return getGames;
}
