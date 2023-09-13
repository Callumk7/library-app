import { prisma } from "@/lib/clients/prisma";
import { DisplayedGame, GameWithCoverAndGenres, IGDBGameSchema } from "@/types";
import { getSearchResults } from "@/util/igdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	console.log("/search get request");
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const query = params.get("q");

	if (!query) {
		return new NextResponse("no query provided", { status: 401 });
	}

	const results = await getSearchResults(query);


	const body = JSON.stringify(results);
	return new NextResponse(body, { status: 200, statusText: "all done mate" });
}

export async function POST(req: NextRequest) {
	console.log("/search POST request");

	// the body of this request should be an IGDB search result, that we are going
	// to post to our database.

	const body = await req.json();

	let game;
	try {
		const validGame = IGDBGameSchema.parse(body);
		game = validGame;
	} catch (err) {
		console.error("error parsing body, incorrect format", err);
		return new NextResponse("error parsing body, incorrect format", { status: 401 });
	}

	// upsert the game to the main game table
	try {
		const postGameToDatabase = await prisma.game.upsert({
			where: {
				gameId: game.id,
			},
			update: {
				aggregatedRating: game.aggregated_rating,
				aggregatedRatingCount: game.aggregated_rating_count,
				storyline: game.storyline ? game.storyline : null,
				releaseDate: game.first_release_date ? game.first_release_date : null,
			},
			create: {
				gameId: game.id,
				title: game.name,
				cover: {
					create: {
						imageId: game.cover.image_id,
					},
				},
				aggregatedRating: game.aggregated_rating,
				aggregatedRatingCount: game.aggregated_rating_count,
				storyline: game.storyline ? game.storyline : null,
				releaseDate: game.first_release_date ? game.first_release_date : null,
			},
		});

		console.log(`game saved: ${postGameToDatabase.title}`);
	} catch (err) {
		console.error("error posting game to database", err);
		return new NextResponse("error posting game to database", { status: 401 });
	}

	// handle genres, if the game has associated genres
	if (game.genres) {
		if (game.genres.length > 0) {
			console.log("we have genres..");
			const promises = [];
			for (const genre of game.genres) {
				const upsertGenre = prisma.genre.upsert({
					where: {
						externalId: genre.id,
					},
					update: {},
					create: {
						externalId: genre.id,
						name: genre.name,
					},
					select: {
						id: true,
						externalId: true,
					},
				});

				promises.push(upsertGenre);
			}
			const results = await Promise.all(promises);

			const connectionPromises = [];
			for (const genre of results) {
				console.log(`${game.id} game id, ${genre.id} genre id`);
				const connectGenre = prisma.genresOnGames.upsert({
					where: {
						gameId_genreId: {
							gameId: game.id,
							genreId: genre.id,
						},
					},
					update: {
						gameId: game.id,
						genreId: genre.id,
					},
					create: {
						gameId: game.id,
						genreId: genre.id,
					},
				});

				connectionPromises.push(connectGenre);
				console.log(`genre connection promise made: ${genre.id}`);
			}
			const connectionResults = await Promise.all(connectionPromises);
			console.log(connectionResults);
			if (connectionResults.length === results.length) {
				console.log(
					"Good news everyone! It looks like all connections are completed"
				);
			} else {
				console.log("Something went wrong.. we have");
				console.log(`${results.length} genres processed, but only`);
				console.log(`${connectionResults.length} connections processed.. `);
				console.log(`${game.name}, id: ${game.id}`);
			}
		}
	}

	// handle artwork
	if (game.artworks) {
		console.log(`${game.artworks.length} artworks to process`);
		const promises = [];
		for (const artwork of game.artworks) {
			const upsertArtwork = prisma.artwork.upsert({
				where: {
					imageId: artwork.image_id,
				},
				update: {},
				create: {
					imageId: artwork.image_id,
					gameId: game.id,
				},
			});
			promises.push(upsertArtwork);
			console.log(`artwork promise to ${game.name}, id: ${artwork.id}`);
		}

		const results = await Promise.all(promises);
		console.log(`${results.length} promises completed: Artwork`);
	}

	if (game.screenshots) {
		console.log(`${game.screenshots.length} screenshots to process`);
		const promises = [];
		for (const screenshot of game.screenshots) {
			const upsertScreenshot = prisma.screenshot.upsert({
				where: {
					imageId: screenshot.image_id,
				},
				update: {},
				create: {
					imageId: screenshot.image_id,
					gameId: game.id,
				},
			});

			promises.push(upsertScreenshot);
			console.log(`screenshot posted to ${game.name}, id: ${screenshot.id}`);
		}
		const results = await Promise.all(promises);
		console.log(`${results.length} promises completed: Screenshots`);
	}

	// finally, add game to collection if a user is signed in

	const resBody = JSON.stringify(game);
	return new NextResponse(resBody, { status: 200 });
}
