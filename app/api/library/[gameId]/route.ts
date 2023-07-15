import prisma from "@/lib/prisma/client";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
	_req: NextRequest,
	{ params }: { params: { gameId: string } }
) {
	const gameId = params.gameId;
	const { userId } = auth();
	console.log(`POST request with id: ${gameId} from user${userId}`);

	if (!userId) {
		return NextResponse.error();
	}
	const userPromise = prisma.user.findFirst({
		where: {
			clerkId: userId,
		},
		select: {
			id: true,
		},
	});

	const gamePromise = prisma.game.findFirst({
		where: {
			externalId: Number(gameId),
		},
		select: {
			id: true,
		},
	});

	const [user, game] = await Promise.all([userPromise, gamePromise]);

	if (!user || !game) {
		return NextResponse.error();
	}

	const upsertUserCollection = await prisma.userGameCollection.create({
		data: {
			userId: user.id,
			gameId: game.id,
		},
	});

	console.log(
		`added collection ${upsertUserCollection.gameId}, ${upsertUserCollection.userId}`
	);
	return NextResponse.json({ upsertUserCollection });
}
