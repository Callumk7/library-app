export async function getGameDetails(gameId: number): Promise<unknown> {
	const res = await fetch(process.env.IGDB_URL!, {
		method: "POST",
		headers: {
			"Client-ID": process.env.IGDB_CLIENT_ID!,
			Authorization: `Bearer ${process.env.IGDB_BEARER_TOKEN!}`,
			"content-type": "text/plain",
		},
		body: `fields name, artworks.image_id, screenshots.image_id, aggregated_rating, aggregated_rating_count, cover.image_id, storyline, first_release_date, genres.name; where id = ${gameId};`
	});

	const resBody: unknown[] = await res.json();
	return resBody[0];
}
