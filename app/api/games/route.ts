import { searchGames, searchGamesWithUsers } from "@/features/search/hooks/queries";
import { prisma } from "@/lib/clients/prisma";
import { Job } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	console.log("GET /games hit.");

	// search results...
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const query = params.get("q");

	if (query) {
		console.log(`search query: ${query}`);
		const results = await searchGamesWithUsers(query);

		if (results.length === 0) {
			console.log("no results found");
			return new NextResponse("no results found", { status: 404 });
		} else {
			const body = JSON.stringify(results);
			return new NextResponse(body, { status: 200 });
		}
	}

	return new NextResponse("no search provided", {status: 401})

	// get all games..

	// other..
}

// This route is used to update games away from the main thread, by updating storyline and
// ratings based on jobs

export async function POST(req: NextRequest) {
	console.log("games route hit!");

	if (!req.body) {
		console.log("no body found");
		return new NextResponse("No request body found", { status: 401 });
	}

	const job: Job = await req.json();
	console.log(`new job parsed: ${job.id}`);

	if (!job) {
		return new NextResponse("No job provided", { status: 401 });
	}

	if (job.type !== "storyline" && job.type !== "rating") {
		return new NextResponse("incorrect job type", { status: 401 });
	}

	if (!job.payload) {
		return new NextResponse("No payload provided", { status: 401 });
	}

	let returnJson = "";
	if (job.type === "storyline") {
		const updateStoryline = await prisma.game.update({
			where: {
				gameId: job.payload.gameId,
			},
			data: {
				storyline: job.payload.storyline,
			},
			select: {
				gameId: true,
				storyline: true,
			},
		});

		returnJson = JSON.stringify(updateStoryline);
	}

	if (job.type === "rating") {
		if (!job.payload.rating) {
			return new NextResponse("No rating in payload", { status: 401 });
		}
		const updateRating = await prisma.game.update({
			where: {
				gameId: job.payload.gameId,
			},
			data: {
				aggregatedRating: job.payload.rating.aggregated_rating,
				aggregatedRatingCount: job.payload.rating.aggregated_rating_count,
			},
			select: {
				gameId: true,
				aggregatedRating: true,
			},
		});

		returnJson = JSON.stringify(updateRating);
	}

	return new NextResponse(returnJson, { status: 200 });
}
