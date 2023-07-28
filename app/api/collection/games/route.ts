import { NextRequest, NextResponse } from "next/server";

// placeholder route
export async function GET(req: NextRequest) {
	console.log("GET /api/collection/games...");

	return NextResponse.json({ response: "hello" });
}
