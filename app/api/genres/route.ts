import { prisma } from "@/lib/clients/prisma";
import { getUserGenres } from "@/lib/hooks/genres/queries";
import { Job } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	console.log("get request to genres");
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const userId = params.get("userId");

	if (!userId) {
		console.log("no user id provided");
		return new NextResponse("No user id provided", { status: 401 });
	}

	try {
		const genres = await getUserGenres(userId);
		const body = JSON.stringify(genres);
		return new NextResponse(body, { status: 200 });
	} catch (err) {
		console.error("Error getting user genres", err);
		return new NextResponse("Server error getting genres", { status: 500 });
	}
}

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
		console.log(
			`processed genre ${upsertGenreConnection.genreId} on game ${upsertGenreConnection.gameId}`
		);
	});

	const returnJson = JSON.stringify(processedConnections);

	console.log("all genres processed");
	return new NextResponse(returnJson, { status: 200 });
}
