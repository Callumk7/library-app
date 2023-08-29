import { getPlaylists } from "@/features/playlists/hooks/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	console.log("new get request to playlists");
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const userId = params.get("userId");

	if (!userId) {
		return new NextResponse("Error, no user", { status: 401 });
	}

	try {
		const playlists = await getPlaylists(userId);
		const body = JSON.stringify(playlists);
		return new NextResponse(body, {
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (err) {
		console.error("error getting playlists", err);
		return new NextResponse("error getting playlists", { status: 500 });
	}
}
