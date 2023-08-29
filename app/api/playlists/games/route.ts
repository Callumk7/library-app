import { prisma } from "@/lib/clients/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	console.log("new post request to playlist/games");

	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const playlistId = params.get("playlistId");

	if (!playlistId) {
		console.log("no playlist id found");
		return new NextResponse("no playlist id found", { status: 401 });
	}

	const data = await req.json();

	if (!data) {
		console.log("no body found");
		return new NextResponse("no body found in request", { status: 401 });
	}

	try {
		const responseBody = [];
		for (const gameId of data) {
			const postGameToPlaylist = await prisma.playlistsOnGames.upsert({
				where: {
					gameId_playlistId: {
						gameId,
						playlistId: Number(playlistId)
					}
				},
				update: {},
				create: {
					gameId: gameId,
					playlistId: Number(playlistId), // catch this earlier
				},
			});

			responseBody.push(postGameToPlaylist);
		}

		const body = JSON.stringify(responseBody);
		return new NextResponse(body, { status: 200 });
	} catch (err) {
		console.error("error posting game to playlist", err);
		return new NextResponse("Error posting game to playlist", { status: 500 });
	}

	console.log("insufficient parameters provided");
	return new NextResponse("insufficient parameters provided", { status: 500 });
}

export async function DELETE(req: NextRequest) {
	console.log("new delete request to playlist/games..");
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const playlistId = params.get("playlistId");

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
