import { NextResponse } from "next/server";

export async function POST(req: Request) {
	console.log("test route hit");

	const body = await req.json();
	console.log(body);

	return new NextResponse("test route complete");
}
