import { prisma } from "@/lib/prisma/client";
import { IGDBGame } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { gameId: number } }) {
	console.log("processing genres...");
	const gameId = Number(params.gameId);

	const game: IGDBGame = await req.json();

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
}
