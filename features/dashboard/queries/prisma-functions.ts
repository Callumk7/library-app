import { prisma } from "@/lib/db/prisma";
import { GameWithCoverAndGenres } from "@/types";

export async function getTopRatedGames(count: number): Promise<GameWithCoverAndGenres[]> {
	const games = await prisma.game.findMany({
		where: {
			aggregatedRating: {
				gt: 75,
			},
			aggregatedRatingCount: {
				gt: 3,
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
		orderBy: {
			aggregatedRating: "desc",
		},
		take: count,
	});

	return games;
}
