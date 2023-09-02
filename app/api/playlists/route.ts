import { deletePlaylist } from "@/features/playlists/hooks/mutations";
import { getPlaylistWithGames, getAllPlaylistsWithGames, getGamesFromPlaylist } from "@/features/playlists/hooks/queries";
import { prisma } from "@/lib/clients/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	console.log(req.method);
	console.log("new get request to playlists");
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const userId = params.get("userId");

	if (!userId) {
		return new NextResponse("Error, no user", { status: 401 });
	}

	const playlistIdParam = params.get("playlistId");

	if (!playlistIdParam) {
		try {
			const playlists = await getAllPlaylistsWithGames(userId);
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

	// if the request has a playlist id searchParam, then we will only return
	// that playlist to the in the response
	try {
		const playlistId = Number(playlistIdParam);
		const games = await getGamesFromPlaylist(playlistId);
		const body = JSON.stringify(games);
		return new NextResponse(body, {
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (err) {
		console.error("error getting playlist games", err);
		return new NextResponse("error getting playlist games", { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	console.log("new post request to playlists..");
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const userId = params.get("userId");

	// /:userId POST request to create playlist
	if (userId) {
		try {
			console.log(`userId: ${userId}`);
			const data = (await req.json()) as { name: string };
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
			return new NextResponse("Error posting playlist with prisma", {
				status: 500,
			});
		}
	}

	const playlistId = params.get("playlistId");
	console.log(`playlist id: ${playlistId}`);

	if (playlistId) {
		try {
			console.log(`playlist id from route: ${playlistId}`);
			const data = (await req.json()) as { gameId: number };
			const gameId: number = data.gameId;
			const postGameToPlaylist = await prisma.playlistsOnGames.create({
				data: {
					gameId: gameId,
					playlistId: Number(playlistId), // catch this earlier
				},
			});

			const body = JSON.stringify(postGameToPlaylist);
			return new NextResponse(body, { status: 200 });
		} catch (err) {
			console.error("error posting game to playlist", err);
			return new NextResponse("Error posting game to playlist", { status: 500 });
		}
	}

	console.log("insufficient parameters provided");
	return new NextResponse("insufficient parameters provided", { status: 500 });
}

export async function DELETE(req: NextRequest) {
	console.log("playlist DELETE function hit");
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const playlistId = params.get("playlistId");

	if (!playlistId) {
		console.log("no playlist id provided");
		return new NextResponse("no playlist id provided", { status: 401 });
	}

	try {
		const deletedPlaylist = await deletePlaylist(Number(playlistId));
		const body = JSON.stringify(deletedPlaylist);
		return new NextResponse(body, { status: 200 });
	} catch (err) {
		console.error("error deleting playlist", err);
		return new NextResponse("Error deleting playlist", { status: 500 });
	}
}
