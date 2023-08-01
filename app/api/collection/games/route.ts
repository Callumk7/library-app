import { NextRequest, NextResponse } from "next/server";

// placeholder route
export function GET(_req: NextRequest) {
	console.log("GET /api/collection/games...");

	return NextResponse.json({ response: "hello" });
}
