import { prisma } from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: { playlistId: string } }
) {
	const playlistId = params.playlistId;
	const url = new URL(req.url);
	const searchParams = new URLSearchParams(url.search);
	const gameId = searchParams.get("gameId");

	console.log(`Playlist route hit with playlist id: ${playlistId}, game id: ${gameId}`);

	const addPlaylist = await prisma.playlistsOnGames.create({
		data: {
			gameId: Number(gameId),
			playlistId: Number(playlistId),
		},
	});

	return new NextResponse("added!", { status: 200 });
}
