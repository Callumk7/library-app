import { prisma } from "@/lib/prisma/client";
import { Job } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	console.log("genres route hit!");

	if (!req.body) {
		console.log("no body found");
		return new NextResponse("No request body found", { status: 401 });
	}

	const job: Job = await req.json();
	console.log(`new job parsed: ${job.id}`);

	if (!job) {
		return new NextResponse("No job provided", { status: 401 });
	}

	if (job.type !== "genre") {
		return new NextResponse("incorrect job type", { status: 401 });
	}

	if (!job.payload) {
		return new NextResponse("No payload provided", { status: 401 });
	}

	if (!job.payload.genres) {
		return new NextResponse("No genres provided in payload", { status: 401 });
	}

	const promises = [];
	for (const genre of job.payload.genres) {
		const upsertGenrePromise = prisma.genre.upsert({
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
			},
		});

		promises.push(upsertGenrePromise);
	}

	const processedGenres = await Promise.all(promises);

	const processedConnections: { gameId: number; genreId: number }[] = [];
	processedGenres.forEach(async (genre) => {
		const upsertGenreConnection = await prisma.genresOnGames.upsert({
			where: {
				gameId_genreId: {
					gameId: job.payload.gameId,
					genreId: genre.id,
				},
			},
			update: {},
			create: {
				genreId: genre.id,
				gameId: job.payload.gameId,
			},
			select: {
				gameId: true,
				genreId: true,
			},
		});
		processedConnections.push(upsertGenreConnection);
		console.log(`processed genre ${upsertGenreConnection.genreId} on game ${upsertGenreConnection.gameId}`)
	});

	const returnJson = JSON.stringify(processedConnections);

	console.log("all genres processed");
	return new NextResponse(returnJson, { status: 200 });
}
