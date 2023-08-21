import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { isArray, isNumber } from "util";

export async function POST(
	req: NextRequest,
	{ params }: { params: { playlistId: string } }
) {
	const playlistId = params.playlistId;
	const url = new URL(req.url);
	const searchParams = new URLSearchParams(url.search);
	const gameId = searchParams.get("gameId");

	if (gameId) {
		console.log(
			`Playlist route hit with playlist id: ${playlistId}, game id: ${gameId}`
		);


		return new NextResponse("added!", { status: 200 });
	} else {
		const body = await req.json();

		if (body) {
			if (isArray(body)) {
				for (const gameId of body) {
					if (isNumber(gameId)) {
						const addToPlaylist = await prisma.playlistsOnGames.create({
							data: {
								gameId: Number(gameId),
								playlistId: Number(playlistId),
							},
						});

						console.log(`added ${gameId} to ${playlistId}`);
					}
				}
				return new NextResponse("bulk added!", { status: 200 });
			}
		}

		return new NextResponse("no body or gameId found", { status: 401 });
	}
}
