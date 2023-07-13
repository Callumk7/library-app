import prisma from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { userId, gameId } = await req.json();
	const likedGame = await prisma.userGameCollection.create({
		data: {
			userId,
			gameId,
		},
	});
	console.log("created relation");
	return new NextResponse(`created ${likedGame.gameId}, ${likedGame.userId} relation`);
}
