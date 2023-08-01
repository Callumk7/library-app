import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
	const path = req.nextUrl.searchParams.get("path") || "/";
	revalidatePath(path);
	return NextResponse.json({ path: path, revalidated: true, now: Date.now() });
}
