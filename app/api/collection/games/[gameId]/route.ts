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

	if (!item.cover) {
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

	console.log(
		`added collection ${upsertGame.UserGameCollection[0].clerkId}, ${upsertGame.UserGameCollection[0].gameId}`
	);
	return NextResponse.json({ upsertGame });
}
