import { prisma } from "@/lib/prisma/client";
import { IGDBGame } from "@/types";

async function getSearchResults(q: string): Promise<IGDBGame[]> {
	const res = await fetch(process.env.IGDB_URL!, {
		method: "POST",
		headers: {
			"Client-ID": process.env.IGDB_CLIENT_ID!,
			Authorization: `Bearer ${process.env.IGDB_BEARER_TOKEN!}`,
			"content-type": "text/plain",
		},
		body: `search "${q}"; fields name, artworks.image_id, screenshots.image_id, aggregated_rating, aggregated_rating_count, cover.image_id, storyline, first_release_date, genres.name; limit 40; where artworks != null;`,
		cache: "force-cache",
	});
	console.log("IGDB fetch completed");
	return res.json();
}

async function getCollectionExternalIds(userId: string): Promise<number[]> {
	const findCollection = await prisma.userGameCollection.findMany({
		where: {
			clerkId: userId,
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

export { getSearchResults, getCollectionExternalIds };
