import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
	console.log("new delete request to playlist/games..");
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const playlistId = params.get("playlistId");

	// /:userId POST request to create playlist
	if (playlistId) {
		try {
			console.log(`userId: ${playlistId}`);
			const data = (await req.json()) as { gameId: number };
			const gameId: number = data.gameId;
			const deleteGameFromPlaylist = await prisma.playlistsOnGames.delete({
				where: {
					gameId_playlistId: {
						gameId,
						playlistId: Number(playlistId),
					},
				},
			});

			const body = JSON.stringify(deleteGameFromPlaylist);
			return new NextResponse(body, {
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (err) {
			console.error("error deleting game with prisma", err);
			return new NextResponse("Error deleting game from playlist with prisma", {
				status: 500,
			});
		}
	}

	console.log("insufficient parameters provided");
	return new NextResponse("insufficient parameters provided", { status: 500 });
}
