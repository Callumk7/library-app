import { getCollectionGameIds } from "@/features/collection/queries/prisma-functions";
import { NextRequest, NextResponse } from "next/server";

// GET collection ids for a specific user, provided in the request body
export async function GET(req: NextRequest) {
	const userId = req.headers.get("user");
	if (!userId) {
		return new NextResponse("No user id provided", { status: 401 });
	}

	let collectionIds: number[] = [];
	try {
		collectionIds = await getCollectionGameIds(userId);
	} catch (err) {
		console.error("something went wrong", err);
	}

	return NextResponse.json(collectionIds);
}
