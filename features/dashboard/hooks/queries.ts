import { prisma } from "@/lib/clients/prisma";
import { GameWithCoverAndGenres, GameWithCoverGenresUsers } from "@/types";

export async function getTopRatedGames(
	count: number
): Promise<GameWithCoverGenresUsers[]> {
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
					user: true,
				},
			},
		},
		orderBy: {
			aggregatedRating: "desc",
		},
		take: count,
	});

	return games;
}
