import { prisma } from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// placeholder route
export function GET(_req: NextRequest) {
	console.log("GET /api/collection/games...");

	return NextResponse.json({ response: "hello" });
}

// post a collection entry to the database.
// user id is provided by clerk, game id is a search parameter
export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const gameId = params.get("gameId");

	const { userId } = auth();

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
		return new NextResponse(resBody, {status: 200});
	} catch (err) {
		console.error("error when processing game collection creation", err);
		throw err;
	}
}
