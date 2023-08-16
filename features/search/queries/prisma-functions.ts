import { prisma } from "@/lib/db/prisma";
import { GameWithCoverAndGenres } from "@/types";

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
