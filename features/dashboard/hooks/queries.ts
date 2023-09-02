import { prisma } from "@/lib/clients/prisma";
import { GameWithCoverGenresUsers } from "@/types";

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

export async function getTopRatedGamesFromGenre(genreId: number, count: number) {
	const games = await prisma.genresOnGames.findMany({
		where: {
			genreId: genreId,
		},
		select: {
			genre: {
				select: {
					name: true,
				},
			},
			game: {
				include: {
					cover: true,
					genres: {
						include: {
							genre: true,
						},
					},
				},
			},
		},
		orderBy: {
			game: {
				aggregatedRating: "asc",
			},
		},
		take: count,
	});

	return games;
}
