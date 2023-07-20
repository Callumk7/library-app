import { prisma } from "@/lib/prisma/client";
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

	if (item.cover) {
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
						update: {}
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
			},
		});
	}

	const upsertUserCollection = await prisma.userGameCollection.upsert({
		where: {
			clerkId_gameId: {
				gameId: gameId,
				clerkId: userId,
			},
		},
		update: {},
		create: {
			clerkId: userId,
			gameId: gameId,
		},
	});

	console.log(
		`added collection ${upsertUserCollection.gameId}, ${upsertUserCollection.clerkId}`
	);
	return NextResponse.json({ upsertUserCollection });
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
