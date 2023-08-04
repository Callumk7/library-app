import { prisma } from "@/lib/prisma/client";
import { Job } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// shape of job is known
export async function POST(req: NextRequest) {
	console.log("artwork route hit!");

	if (!req.body) {
		console.log("no body found");
		return new NextResponse("No request body found", { status: 401 });
	}

	const job: Job = await req.json();
	console.log(`new job parsed: ${job.id}`);

	if (!job) {
		return new NextResponse("No job provided", { status: 401 });
	}

	if (job.type !== "artwork") {
		return new NextResponse("incorrect job type", { status: 401 });
	}

	if (!job.payload) {
		return new NextResponse("No payload provided", { status: 401 });
	}

	if (!job.payload.artwork) {
		return new NextResponse("payload contains no artwork to process", {
			status: 401,
		});
	}

	// payload for artork is an array of artwork and screenshots to process..
	const promises = [];
	for (const art of job.payload.artwork) {
		if (art.type === "artwork") {
			const upsertArtworkPromise = prisma.artwork.upsert({
				where: {
					imageId: art.image_id,
				},
				update: {},
				create: {
					imageId: art.image_id,
					gameId: job.payload.gameId,
				},
			});

			promises.push(upsertArtworkPromise);
		}
		if (art.type === "artwork") {
			const upsertScreenshotPromise = prisma.screenshot.upsert({
				where: {
					imageId: art.image_id,
				},
				update: {},
				create: {
					imageId: art.image_id,
					gameId: job.payload.gameId,
				},
			});

			promises.push(upsertScreenshotPromise);
		}
	}

	const results = await Promise.all(promises);
	const resultsJson = JSON.stringify(results);
	console.log("all artwork processed");
	return new NextResponse(resultsJson, { status: 200 });
}
