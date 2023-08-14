import { CollectionWithGamesGenresPlaylists } from "@/types";
import { prisma } from "../prisma";

export async function getCollection(userId: string): Promise<CollectionWithGamesGenresPlaylists[]> {
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
	console.time("get collection game ids")
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
	console.timeEnd("get collection game ids")
	return results;
}
