import { prisma } from "@/lib/prisma/client";
import { IGDBGameSchema } from "@/types";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// Create new user game collection entry.
export async function POST(req: NextRequest, { params }: { params: { gameId: number } }) {
	console.time("game add route");
	const gameId = Number(params.gameId);
	const { userId } = auth();
	console.log(`POST request with id: ${gameId} from user${userId}`);

	if (!userId) {
		return new NextResponse(null, {
			status: 401,
			statusText: "Not authorised; no user id",
		});
	}

	let game;
	try {
		const gameJson: unknown = await req.json();
		game = IGDBGameSchema.parse(gameJson); // zod validation
		console.timeLog("game add route", "item parsed...");
		console.log(`item details recovered for game ${game.name}`);

		console.timeLog("game add route", "upsertCollection start..");
		const createCollection = await prisma.userGameCollection.create({
			data: {
				userId,
				gameId,
			},
			select: {
				userId: true,
				gameId: true,
			},
		});

		console.timeLog("game add route", "upsertCollection completed");

		console.log(
			`added collection ${createCollection.userId}, ${createCollection.gameId}`
		);
	} catch (err) {
		console.error("error when processing game collection creation", err);
		throw err;
	}

	// Handoff artwork and genre tasks to worker endpoints. This does not block
	// the end user, but error handling could become messy.

	// process storyline and ratings async
	const promises = [];
	if (game.storyline) {
		const storylineHandoffPromise = fetch(`${process.env.APP_URL}/api/worker/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				handoffType: "storyline",
			},
			body: JSON.stringify(game),
		});

		promises.push(storylineHandoffPromise);
	}

	if (game.aggregated_rating) {
		const ratingHandoffPromise = fetch(`${process.env.APP_URL}/api/worker/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				handoffType: "rating",
			},
			body: JSON.stringify(game),
		});
		promises.push(ratingHandoffPromise);
	}

	console.timeLog("game add route", "storyline and/or rating added");
	// process artwork async
	const artworkHandoffPromise = fetch(`${process.env.APP_URL}/api/worker/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			handoffType: "artwork",
		},
		body: JSON.stringify(game),
	});
	console.timeLog("game add route", "artwork promises created");
	promises.push(artworkHandoffPromise);

	// process genres async
	const genreHandoffPromise = fetch(`${process.env.APP_URL}/api/worker/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			handoffType: "genres",
		},
		body: JSON.stringify(game),
	});
	promises.push(genreHandoffPromise);
	console.timeLog("game add route", "genre promises created");

	await Promise.all(promises);
	console.timeEnd("game add route");
	return new NextResponse("game added successfully", { status: 200 });
}

// CURRENTLY JUST FOR PLAYED TOGGLING
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { gameId: number } }
) {
	const { userId } = auth();
	const gameId = Number(params.gameId);

	if (!userId) {
		return NextResponse.error();
	}

	const gameJson = await req.json();

	if ("played" in gameJson) {
		console.log(`PATCH REQUEST: ${userId}`);
		const updatePlayedGame = await prisma.userGameCollection.update({
			where: {
				userId_gameId: {
					userId,
					gameId,
				},
			},
			data: {
				played: gameJson.played,
			},
		});
		return NextResponse.json(updatePlayedGame);
	}
}

export async function DELETE(_req: Request, { params }: { params: { gameId: number } }) {
	const gameId = Number(params.gameId);
	const { userId } = auth();
	console.log(`DELETE request with id: ${gameId} from user${userId}`);

	if (!userId) {
		return NextResponse.error();
	}
	const deleteCollectionItem = await prisma.userGameCollection.delete({
		where: {
			userId_gameId: {
				userId,
				gameId,
			},
		},
	});

	return NextResponse.json(deleteCollectionItem);
}
