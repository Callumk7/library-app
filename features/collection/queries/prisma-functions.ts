import { CollectionWithGamesGenresPlaylists } from "@/types";
import { prisma } from "@/lib/db/prisma";

export async function getFullCollection(
	userId: string
): Promise<CollectionWithGamesGenresPlaylists[]> {
	console.time("get collection");
	const userCollection = await prisma.userGameCollection.findMany({
		where: {
			userId,
		},
		include: {
			game: {
				include: {
					cover: true,
					genres: {
						include: {
							genre: true,
						},
					},
					playlists: {
						include: {
							playlist: true,
						},
					},
				},
			},
		},
	});

	console.timeEnd("get collection");
	return userCollection;
}

export async function getCollectionGameIds(userId: string): Promise<number[]> {
	console.time("get collection game ids");
	const findCollection = await prisma.userGameCollection.findMany({
		where: {
			userId,
		},
		select: {
			gameId: true,
		},
	});

	const results = [];
	for (const result of findCollection) {
		results.push(result.gameId);
	}
	console.timeEnd("get collection game ids");
	return results;
}

export async function getUserGenres(userId: string): Promise<string[]> {
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

	// return a string array of genre names
	const genreArray = findUserGenres.map((g) => g.name);
	console.timeEnd("get user genres");
	return genreArray;
}
