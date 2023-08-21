import { POST } from "@/app/api/artwork/route";
import { prisma } from "@/lib/db/prisma";
import { GameWithCoverAndGenres, GameWithCoverGenresUsers } from "@/types";

export async function searchGames(searchTerm: string): Promise<GameWithCoverAndGenres[]> {
	const results = await prisma.game.findMany({
		where: {
			title: {
				contains: searchTerm,
				mode: "insensitive",
			},
		},
		include: {
			cover: true,
			genres: {
				include: {
					genre: true,
				},
			},
		},
	});

	return results;
}

export async function searchGamesWithUsers(
	searchTerm: string
): Promise<GameWithCoverGenresUsers[]> {
	const results = await prisma.game.findMany({
		where: {
			title: {
				contains: searchTerm,
				mode: "insensitive",
			},
		},
		include: {
			cover: true,
			genres: {
				include: {
					genre: true,
				},
			},
			users: true,
		},
	});

	return results;
}
