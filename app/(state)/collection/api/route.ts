import { prisma } from "@/lib/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

async function getGames(userId: string) {
	const userCollection = await prisma.userGameCollection.findMany({
		where: {
			clerkId: userId!,
		},
		select: {
			gameId: true,
		},
	});

	const gameIdArray = userCollection.map((user) => user.gameId);

	const games = await prisma.game.findMany({
		where: {
			externalId: {
				in: gameIdArray,
			},
		},
		include: {
			cover: true,
			UserGameCollection: {
				where: {
					clerkId: userId,
				},
			},
		},
	});
	return games;
}

export async function GET(request: NextRequest) {
	const { userId } = auth();
	console.log(userId);
	const collection = await getGames(userId!);
	return NextResponse.json(collection);
}
