import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
	const path = "/collection";
	revalidatePath(path);
	return NextResponse.json({ revalidated: true, now: Date.now() });
}
