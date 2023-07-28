import { prisma } from "@/lib/prisma/client";

export async function getCollectionGameIds(userId: string | null): Promise<number[]> {
	if (!userId) {
		return [];
	}

	console.log("fetching collection array");
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
	console.log("get collection completed");
	console.log(results);
	return results;
}
