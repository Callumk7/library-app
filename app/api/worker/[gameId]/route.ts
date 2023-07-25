// create a route that will handle async data handling.
// This can be artwork, screenshots or genres

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: NextRequest, { params }: { params: { gameId: number } }) {
	const gameId = params.gameId;
	const headersList = headers();
	const handoffType = headersList.get("handoffType");
	console.log(`type: ${handoffType} received...`);
	console.log(`${gameId} game ID recieved...`);

	let res: Response;
	const body = await req.text();
	switch (handoffType) {
		case "artwork":
			console.log("processing artwork...");
			res = await fetch(`${process.env.APP_URL}/api/collection/artwork/${gameId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body,
			});
			break;

		case "genres":
			console.log("processing genres...");
			res = await fetch(`${process.env.APP_URL}/api/collection/genres/${gameId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body,
			});
			break;

		default:
			console.log("ops, not a genre or artwork request");
			return new NextResponse(null, {
				status: 400,
				statusText: "not correct type",
			});
	}

	return new NextResponse("work handled successfully")
}
