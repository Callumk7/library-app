import { IGDBGameSchema, type IGDBGame } from "@/types";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis/client";

export async function POST(req: NextRequest) {
	const headersList = headers();
	const handoffType = headersList.get("handoffType");
	console.log(`type: ${handoffType} received...`);

	try {
		const requestBodyJson: unknown = await req.json();
		const game = IGDBGameSchema.parse(requestBodyJson);
		const job = {
			id: new Date().toTimeString() + game.id.toString(),
			type: handoffType,
			payload: game,
		};

		const jobJson = JSON.stringify(job);

		await redis.rpush("job", jobJson);

		return new NextResponse("OK", { status: 200 });
	} catch (err) {
		console.error("an error occurred on worker route", err);
		throw err;
	}
}
