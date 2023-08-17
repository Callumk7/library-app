import { CollectionWithGamesGenresPlaylists } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { getFullCollection } from "@/features/collection/queries/prisma-functions";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db/prisma";

// GET entire collection, and sub data (genres, artworks, screenshots)
// in one go. This is the initial fetch of all data
export async function GET(req: NextRequest) {
	const userId = req.headers.get("user");
	if (!userId) {
		return new NextResponse("No user id provided", { status: 401 });
	}

	let collection: CollectionWithGamesGenresPlaylists[] = [];
	try {
		collection = await getFullCollection(userId);
	} catch (err) {
		console.error("something went wrong", err);
	}
	return NextResponse.json(collection);
}

// post a collection entry to the database.
// user id is provided by clerk, game id is a search parameter
export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const gameId = params.get("gameId");

	const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";

	if (!userId) {
		return new NextResponse("not logged in, missing user id", { status: 401 });
	}

	if (!gameId) {
		return new NextResponse("gameId missing", { status: 404 });
	}

	try {
		const createCollection = await prisma.userGameCollection.create({
			data: {
				userId,
				gameId: Number(gameId),
			},
			select: {
				userId: true,
				gameId: true,
			},
		});
		console.log(
			`added collection ${createCollection.userId}, ${createCollection.gameId}`
		);

		const resBody = JSON.stringify(createCollection);
		return new NextResponse(resBody, { status: 200 });
	} catch (err) {
		console.error("error when processing game collection creation", err);
		throw err;
	}
}
