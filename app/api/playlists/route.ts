import { getPlaylists } from "@/lib/db/playlists/queries";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	console.log("new post request to playlists..");
	const data = (await req.json()) as { name: string };
	const { userId } = auth();

	console.log(data);
	console.log(userId);
	if (!data) {
		return new NextResponse("Error no content", { status: 500 });
	}

	if (!userId) {
		return new NextResponse("Error no user", { status: 500 });
	}

	try {
		const name: string = data.name;
		const newPlaylist = await prisma.playlist.create({
			data: {
				name,
				userId,
			},
		});

		const body = JSON.stringify(newPlaylist);
		return new NextResponse(body, {
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (err) {
		console.error("error posting playlist with prisma", err);
		return new NextResponse("Error posting playlist with prisma", { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	console.log("new get request to playlists");
	const { userId } = auth();

	if (!userId) {
		return new NextResponse("Error, no user", { status: 401 });
	}

	try {
		const playlists = await getPlaylists(userId);
		const body = JSON.stringify(playlists);
		return new NextResponse(body, {
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (err) {
		console.error("error getting playlists", err);
		return new NextResponse("error getting playlists", { status: 500 });
	}
}
