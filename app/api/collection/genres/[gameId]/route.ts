import { prisma } from "@/lib/prisma/client";
import { IGDBGame } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { gameId: number } }) {
	console.log("processing genres...");

	const item: IGDBGame = await req.json();

	if (item.genres) {
		const genrePromises = item.genres.map(async (genre) => {
			const upsertGenre = await prisma.genre.upsert({
				where: {
					externalId: genre.id,
				},
				update: {
					games: {
						connectOrCreate: {
							where: {
								gameId_genreId: {
									gameId: item.id,
									genreId: genre.id,
								},
							},
							create: {
								gameId: item.id,
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
									gameId: item.id,
									genreId: genre.id,
								},
							},
							create: {
								gameId: item.id,
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

	return NextResponse;
}
