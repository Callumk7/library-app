import type { IGDBGame } from "@/types";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis/client";

export async function POST(req: NextRequest) {
	const headersList = headers();
	const handoffType = headersList.get("handoffType");
	console.log(`type: ${handoffType} received...`);

	const body: IGDBGame = await req.json();

	const job = {
		id: new Date().toTimeString() + body.id.toString(),
		type: handoffType,
		payload: body,
	};

	const jobJson = JSON.stringify(job);

	await redis.rpush("job", jobJson);
	return new NextResponse("OK", { status: 200 });
}
