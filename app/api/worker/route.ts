// create a route that will handle async data handling.
// This can be artwork, screenshots or genres

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
	const headersList = headers();
	const handoffType = headersList.get("handoffType");
	console.log(handoffType);

	return new NextResponse(`${handoffType} handoff processed`);
}
