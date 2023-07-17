import prisma from "@/lib/prisma/client";
import { IGDBGame } from "@/types";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { gameId: number } }) {
	const gameId = params.gameId;
	const { userId } = auth();
	console.log(`POST request with id: ${gameId} from user${userId}`);

	const item: IGDBGame = await req.json();
	console.log(`item details recovered for game ${item.name}`);

	if (!userId) {
		return NextResponse.error();
	}

	if (item.cover) {
		// const createGame = await prisma.game.create({
		// 	data: {
		// 		externalId: Number(gameId),
		// 		title: item.name,
		// 		cover: {
		// 			create: {
		// 				imageId: item.cover.image_id,
		// 			},
		// 		},
		// 	},
		// 	include: {
		// 		cover: true,
		// 	},
		// });

		const upsertGame = await prisma.game.upsert({
			where: {
				externalId: Number(gameId),
			},
			update: {
				cover: {
					create: {
						imageId: item.cover.image_id,
					},
				},
			},
			create: {
				externalId: Number(gameId),
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
				gameId: Number(gameId),
				clerkId: userId,
			},
		},
		update: {},
		create: {
			clerkId: userId,
			gameId: Number(gameId),
		},
	});

	console.log(
		`added collection ${upsertUserCollection.gameId}, ${upsertUserCollection.clerkId}`
	);
	return NextResponse.json({ upsertUserCollection });
}

export async function DELETE(_req: Request, { params }: { params: { gameId: number } }) {
	const gameId = params.gameId;
	const { userId } = auth();
	console.log(`DELETE request with id: ${gameId} from user${userId}`);

	if (!userId) {
		return NextResponse.error();
	}
	const deleteCollectionItem = await prisma.userGameCollection.delete({
		where: {
			clerkId_gameId: {
				gameId: Number(gameId),
				clerkId: userId,
			},
		},
	});

	return NextResponse.json(deleteCollectionItem);
}
