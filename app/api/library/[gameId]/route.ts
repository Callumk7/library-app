import { prisma } from "@/lib/prisma/client";
import { Prisma } from "@prisma/client";
import { IGDBGame } from "@/types";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { gameId: number } }) {
	const gameId = Number(params.gameId);
	const { userId } = auth();
	console.log(`POST request with id: ${gameId} from user${userId}`);

	const item: IGDBGame = await req.json();
	console.log(`item details recovered for game ${item.name}`);

	if (!userId) {
		return NextResponse.error();
	}

	const upsertGame = await prisma.game.upsert({
		where: {
			externalId: gameId,
		},
		update: {
			cover: {
				upsert: {
					create: {
						imageId: item.cover.image_id,
					},
					update: {},
				},
			},
			UserGameCollection: {
				connectOrCreate: {
					where: {
						clerkId_gameId: {
							clerkId: userId,
							gameId: gameId,
						},
					},
					create: {
						clerkId: userId,
					},
				},
			},
		},
		create: {
			externalId: gameId,
			title: item.name,
			cover: {
				create: {
					imageId: item.cover.image_id,
				},
			},
			UserGameCollection: {
				create: {
					clerkId: userId,
				},
			},
		},
		select: {
			UserGameCollection: true,
		},
	});

	// process artwork
	fetch(`${process.env.APP_URL}/collection/artwork`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(item),
	});

	console.log(
		`added collection ${upsertGame.UserGameCollection[0].clerkId}, ${upsertGame.UserGameCollection[0].gameId}`
	);
	return NextResponse.json({ upsertGame });
}

export async function DELETE(_req: Request, { params }: { params: { gameId: number } }) {
	const gameId = Number(params.gameId);
	const { userId } = auth();
	console.log(`DELETE request with id: ${gameId} from user${userId}`);

	if (!userId) {
		return NextResponse.error();
	}
	const deleteCollectionItem = await prisma.userGameCollection.delete({
		where: {
			clerkId_gameId: {
				gameId: gameId,
				clerkId: userId,
			},
		},
	});

	return NextResponse.json(deleteCollectionItem);
}

// CURRENTLY JUST FOR LIKE SWAPPING
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { gameId: number } }
) {
	const { userId } = auth();
	const gameId = Number(params.gameId);
	const body = await req.json();

	if (!userId) {
		return NextResponse.error();
	}

	if ("played" in body) {
		console.log(`PATCH REQUEST: ${userId}`);
		const likedGame = await prisma.userGameCollection.update({
			where: {
				clerkId_gameId: {
					clerkId: userId,
					gameId: gameId,
				},
			},
			data: {
				played: body.played,
			},
		});
		return NextResponse.json(likedGame);
	}
}
