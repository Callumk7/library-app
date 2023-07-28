import { prisma } from "@/lib/prisma/client";
import { IGDBGame } from "@/types";

export async function getSearchResults(q: string): Promise<IGDBGame[]> {
	const res = await fetch(process.env.IGDB_URL!, {
		method: "POST",
		headers: {
			"Client-ID": process.env.IGDB_CLIENT_ID!,
			Authorization: `Bearer ${process.env.IGDB_BEARER_TOKEN!}`,
			"content-type": "text/plain",
		},
		body: `search "${q}"; fields name, artworks.image_id, screenshots.image_id, aggregated_rating, aggregated_rating_count, cover.image_id, storyline, first_release_date, genres.name; limit 40; where artworks != null & cover.image_id != null;`,
		cache: "force-cache",
	});
	console.log("IGDB fetch completed");
	return res.json();
}
