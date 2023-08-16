import { getFullCollection } from "@/lib/db/collection/queries";
import { CollectionWithGamesGenresPlaylists } from "@/types";
import { NextRequest, NextResponse } from "next/server";

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


