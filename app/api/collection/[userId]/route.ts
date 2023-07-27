import { getCollectionExternalIds } from "@/util/collection";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { userId: string } }) {
	const userId = params.userId;
	const collection = await getCollectionExternalIds(userId);
	const json = JSON.stringify(collection);
	return new NextResponse(json, { status: 200 });
}
