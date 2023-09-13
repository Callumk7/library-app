import { prisma } from "@/lib/clients/prisma";
import { GameWithCoverAndGenres, GameWithCoverGenresUsers, IGDBGame, IGDBGameSchema } from "@/types";
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

// Get all games from collection
export async function getAllGames() {
	const games = await prisma.game.findMany({
		include: {
			cover: true,
			genres: {
			include: {
				genre: true,
			}
		}
		},
		orderBy: {
			aggregatedRating: "desc",
		},
		take: 100,
	});

	return games;
}

// External Search Query
async function getSearchResultsFromRoute(q: string): Promise<IGDBGame[]> {
	const res = await fetch(`/api/search?q=${q}`, {
		method: "GET",
	});

	if (!res.ok) {
		throw new Error("igdb fetch failed");
	}

	console.log("IGDB fetch completed");

	const data = await res.json();
	console.log(`${data.length} results found`);

	// validate results
	const results: IGDBGame[] = [];
	for (const result of data) {
		const validResult = IGDBGameSchema.parse(result);
		results.push(validResult);
	}
	console.log(`${results.length} valid results`);
	return results;
}

export const useIgdbSearchQuery = (searchTerm: string) => {
	const searchQuery = useQuery({
		queryKey: ["igdb", searchTerm],
		queryFn: async () => getSearchResultsFromRoute(searchTerm)
	})

	return searchQuery;
}
