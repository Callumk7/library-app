import { prisma } from "@/lib/prisma/client";

export async function getCollection(userId: string) {
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
					artworks: true,
					screenshots: true,
				},
			},
		},
	});

	console.timeEnd("get collection");
	return userCollection;
}
