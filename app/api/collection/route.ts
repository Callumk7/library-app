import { prisma } from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";

async function getGames(userId: string) {
	const userCollection = await prisma.userGameCollection.findMany({
		where: {
			clerkId: userId!,
		},
		include: {
			game: {
				include: {
					cover: true,
				},
			},
		},
	});

	return userCollection;

	// const gameIdArray = userCollection.map((user) => user.gameId);
	//
	// const games = await prisma.game.findMany({
	// 	where: {
	// 		externalId: {
	// 			in: gameIdArray,
	// 		},
	// 	},
	// 	include: {
	// 		cover: true,
	// 		UserGameCollection: {
	// 			where: {
	// 				clerkId: userId,
	// 			},
	// 		},
	// 	},
	// });
	// return games;
}

export async function GET(req: NextRequest) {
	const userId = req.headers.get("user");
	console.log(userId);
	const collection = await getGames(userId!);
	return NextResponse.json(collection);
}
