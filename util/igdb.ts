import { IGDBGame, IGDBGameSchema } from "@/types";

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

export async function getSearchResultsFromRoute(q: string): Promise<IGDBGame[]> {
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

export async function getSearchResults(q: string): Promise<IGDBGame[]> {
	const res = await fetch(process.env.IGDB_URL!, {
		method: "POST",
		headers: {
			"Client-ID": process.env.IGDB_CLIENT_ID!,
			Authorization: `Bearer ${process.env.IGDB_BEARER_TOKEN!}`,
			"content-type": "text/plain",
		},
		body: `search "${q}"; fields name, artworks.image_id, screenshots.image_id, aggregated_rating, aggregated_rating_count, cover.image_id, storyline, first_release_date, genres.name; limit 40; where artworks != null & cover.image_id != null;`,
	});

	if (!res.ok) {
		throw new Error("igdb fetch failed");
	}

	console.log("IGDB fetch completed");

	// this is unknown, as we do not know shape of return
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
