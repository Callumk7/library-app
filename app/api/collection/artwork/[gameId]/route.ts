import { prisma } from "@/lib/prisma/client";
import { IGDBGame } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// this route will process game artwork and genres asyncronously from the main request
export async function POST(req: NextRequest, { params }: { params: { gameId: number } }) {
	console.log("processing artwork...");
	const gameId = Number(params.gameId);

	const getGame = await prisma.game.findUnique({
		where: {
			externalId: gameId,
		},
		select: {
			id: true,
		},
	});

	if (!getGame) {
		return new Response("error, no game", { status: 402 });
	}

	const { id } = getGame;

	const item: IGDBGame = await req.json();

	const artworkPromises = item.artworks.map(async (artwork) => {
		const upsertArtwork = await prisma.artwork.upsert({
			where: {
				imageId: artwork.image_id,
			},
			update: {},
			create: {
				gameId: id,
				imageId: artwork.image_id,
			},
		});
		console.log(`artwork ${upsertArtwork.id} created`);
	});

	if (item.screenshots) {
		const screenshotPromises = item.screenshots.map(async (screenshot) => {
			const upsertScreenshot = await prisma.screenshot.upsert({
				where: {
					imageId: screenshot.image_id,
				},
				update: {},
				create: {
					gameId: id,
					imageId: screenshot.image_id,
				},
			});
			console.log(`screenshot ${upsertScreenshot.id} created or updated`);
		});

		await Promise.all([...artworkPromises, ...screenshotPromises]);
	} else {
		await Promise.all(artworkPromises);
	}

	return new NextResponse("artwork and screenshots added!");
}
