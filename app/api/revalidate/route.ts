import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	console.log("revalidate called");
	const path = "/(state)/collection";
	revalidatePath(path);
	return NextResponse.json({ revalidated: true, now: Date.now() });
}
