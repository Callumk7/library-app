import { prisma } from "@/lib/clients/prisma";
import { IGDBGameSchema } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// This route is used primarily to handle async updates to the database away from the main request

export async function POST(req: NextRequest, { params }: { params: { gameId: number } }) {
	console.log("processing genres...");
	const gameId = Number(params.gameId);

	try {
		const reqJson: unknown = await req.json();
		const game = IGDBGameSchema.parse(reqJson);

		if (game.genres) {
			const genrePromises = game.genres.map(async (genre) => {
				const upsertGenre = await prisma.genre.upsert({
					where: {
						externalId: genre.id,
					},
					update: {
						games: {
							connectOrCreate: {
								where: {
									gameId_genreId: {
										gameId,
										genreId: genre.id,
									},
								},
								create: {
									gameId,
								},
							},
						},
					},
					create: {
						externalId: genre.id,
						name: genre.name,
						games: {
							connectOrCreate: {
								where: {
									gameId_genreId: {
										gameId,
										genreId: genre.id,
									},
								},
								create: {
									gameId,
								},
							},
						},
					},
				});
				console.log(`genre ${upsertGenre.id} created or updated`);
			});

			await Promise.all(genrePromises);
		} else {
			console.log("No genres found");
		}

		return new NextResponse("genres added!");
	} catch (err) {
		console.error("error parsing request probably", err);
		throw err;
	}
}
