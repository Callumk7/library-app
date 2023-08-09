import { getCollectionGameIds } from "@/lib/prisma/collection/queries";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { userId: string } }) {
	const userId = params.userId;
	const collection = await getCollectionGameIds(userId);
	const json = JSON.stringify(collection);
	return new NextResponse(json, { status: 200 });
}
