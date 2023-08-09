import { getCollectionGameIds } from "@/lib/prisma/collection/queries";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { userId: string } }) {
	const userId = params.userId;
	if (!userId) {
		return new NextResponse("no user id provided", { status: 401 });
	}
	const collection = await getCollectionGameIds(userId);
	const json = JSON.stringify(collection);
	return new NextResponse(json, { status: 200 });
}
