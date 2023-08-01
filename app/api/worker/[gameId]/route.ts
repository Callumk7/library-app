// create a route that will handle async data handling.
// This can be artwork, screenshots or genres

import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { gameId: number } }) {
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
			res = await fetch(
				`${process.env.APP_URL}/api/collection/artwork?gameId=${gameId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body,
				}
			);
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

		case "storyline":
			console.log("processing storyline...");
			console.log("[stoyline handler] TO BUILD!!!!");
			res = new Response("storyline not processed");
			// res = await fetch(`${process.env.APP_URL}/api/collection/games/${gameId}`, {
			// 	method: "PATCH",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body,
			// });
			break;

		case "rating":
			res = new Response("rating not processed");
			console.log("processing ratings...");
			console.log("[rating handler] TO BUILD!!!");
			// res = await fetch(`${process.env.APP_URL}/api/collection/games/${gameId}`, {
			// 	method: "PATCH",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body,
			// });
			break;

		default:
			console.log("ops, not a genre or artwork request");
			return new NextResponse(null, {
				status: 400,
				statusText: "not correct type",
			});
	}

	return res;
}
