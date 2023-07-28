import { prisma } from "@/lib/prisma/client";
import { IGDBGame } from "@/types";
import { NextRequest, NextResponse } from "next/server";

// this route will process game artwork and genres asyncronously from the main request
export async function POST(req: NextRequest, { params }: { params: { gameId: number } }) {
	console.log("processing artwork...");
	const gameId = Number(params.gameId);

	const game: IGDBGame = await req.json();

	const artworkPromises = game.artworks.map(async (artwork) => {
		const upsertArtwork = await prisma.artwork.upsert({
			where: {
				imageId: artwork.image_id,
			},
			update: {},
			create: {
				gameId,
				imageId: artwork.image_id,
			},
		});
		console.log(`artwork ${upsertArtwork.id} created`);
	});

	if (game.screenshots) {
		const screenshotPromises = game.screenshots.map(async (screenshot) => {
			const upsertScreenshot = await prisma.screenshot.upsert({
				where: {
					imageId: screenshot.image_id,
				},
				update: {},
				create: {
					gameId,
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
