import { prisma } from "@/lib/clients/prisma";
import { GameWithCoverAndGenres, GameWithCoverGenresUsers } from "@/types";
import { useQuery } from "@tanstack/react-query";

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

const searchDbGames = async (searchTerm: string) => {
	const res = await fetch(`/api/games?q=${searchTerm}`, {
		method: "GET",
	});

	if (!res.ok) {
		throw new Error("Network response not ok");
	}

	const data = await res.json();
	return data as GameWithCoverGenresUsers[];
};

export const useDbSearchQuery = (searchTerm: string) => {
	const dbSearchQuery = useQuery({
		queryKey: ["search", searchTerm, "db"],
		queryFn: async () => searchDbGames(searchTerm),
	});

	return dbSearchQuery;
};
