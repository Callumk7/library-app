import { prisma } from "@/lib/db/prisma";
import { IGDBGame, IGDBGameSchema } from "@/types";
import { NextRequest, NextResponse } from "next/server";

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
			const processedGenres = [];
			for (const genre of game.genres) {
				const upsertGenre = await prisma.genre.upsert({
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

				processedGenres.push({
					gameId: game.id,
					id: upsertGenre.id,
				});
			}

			for (const genre of processedGenres) {
				console.log(`${genre.gameId} game id, ${genre.id} genre id`);
				const connectGenre = await prisma.genresOnGames.upsert({
					where: {
						gameId_genreId: {
							gameId: game.id,
							genreId: genre.id,
						},
					},
					update: {},
					create: {
						gameId: genre.gameId,
						genreId: genre.id,
					},
				});

				console.log(`genre connection made: ${connectGenre.genreId}`);
			}
		}
	}

	// handle artwork
	if (game.artworks) {
		console.log(`${game.artworks.length} artworks to process`);
		for (const artwork of game.artworks) {
			const upsertArtwork = await prisma.artwork.upsert({
				where: {
					imageId: artwork.image_id,
				},
				update: {},
				create: {
					imageId: artwork.image_id,
					gameId: game.id,
				},
			});

			console.log(`artwork posted to ${game.name}, id: ${upsertArtwork.id}`);
		}
	}

	if (game.screenshots) {
		console.log(`${game.screenshots.length} screenshots to process`);
		for (const screenshot of game.screenshots) {
			const upsertScreenshot = await prisma.screenshot.upsert({
				where: {
					imageId: screenshot.image_id,
				},
				update: {},
				create: {
					imageId: screenshot.image_id,
					gameId: game.id,
				},
			});

			console.log(`screenshot posted to ${game.name}, id: ${upsertScreenshot.id}`);
		}
	}

	const resBody = JSON.stringify(game)
	return new NextResponse(resBody, {status: 200});
}
