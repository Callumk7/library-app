import { prisma } from "@/lib/prisma/client";

export async function getGameDetails(gameId: number): Promise<unknown> {
	const res = await fetch(process.env.IGDB_URL!, {
		method: "POST",
		headers: {
			"Client-ID": process.env.IGDB_CLIENT_ID!,
			Authorization: `Bearer ${process.env.IGDB_BEARER_TOKEN!}`,
			"content-type": "text/plain",
		},
		body: `fields name, artworks.image_id, screenshots.image_id, aggregated_rating, aggregated_rating_count, cover.image_id, storyline, first_release_date, genres.name; where id = ${gameId};`,
	});

	const resBody: unknown[] = await res.json();
	return resBody[0];
}

export async function getSearchResults(q: string): Promise<unknown> {
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

	// this is unknown, as we do not know shape of return
	return res.json();
}

export async function getTopGames(count: number): Promise<unknown> {
	const res = await fetch(process.env.IGDB_URL!, {
		method: "POST",
		headers: {
			"Client-ID": process.env.IGDB_CLIENT_ID!,
			Authorization: `Bearer ${process.env.IGDB_BEARER_TOKEN!}`,
			"content-type": "text/plain",
		},
		body: `fields name, artworks.image_id, screenshots.image_id, aggregated_rating, aggregated_rating_count, cover.image_id, storyline, first_release_date, genres.name; limit ${count}; where artworks != null & cover.image_id != null & aggregated_rating > 85 & aggregated_rating_count > 10; sort aggregated_rating desc;`,
		cache: "force-cache",
	});
	console.log("IGDB fetch completed");

	// this is unknown, as we do not know shape of return
	return res.json();
}
