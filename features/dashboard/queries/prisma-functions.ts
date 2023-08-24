import { prisma } from "@/lib/db/prisma";
import { GameWithCoverAndGenres } from "@/types";

export async function getTopRatedGames(count: number): Promise<GameWithCoverAndGenres[]> {
	const games = await prisma.game.findMany({
		where: {
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
			users: {
				include: {
					user: true
				}
			}
		},
		orderBy: {
			aggregatedRating: "desc",
		},
		take: count,
	});

	return games;
}
