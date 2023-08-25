import { getGamePlaylists } from "@/features/playlists/queries/prisma-functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	console.log("GET /games/playlistst hit.");
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const gameId = params.get("gameId");

	if (gameId) {
		console.log(`getting playlists for ${gameId}`);
		const results = await getGamePlaylists(Number(gameId)) 

		if (results.length === 0) {
			console.log("no results found");
			return new NextResponse("no results found", { status: 404 });
		} else {
			const body = JSON.stringify(results);
			return new NextResponse(body, { status: 200 });
		}
	}
}
