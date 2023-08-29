import { CollectionWithGamesGenresPlaylists } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/clients/prisma";
import { getFullCollection } from "@/features/collection/hooks/queries";

// GET entire collection, and sub data (genres, artworks, screenshots)
// in one go. This is the initial fetch of all data
export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const userId = params.get("userId");

	if (!userId) {
		return new NextResponse("No user id provided", { status: 401 });
	}

	let collection: CollectionWithGamesGenresPlaylists[] = [];
	try {
		console.log("fetching from api route..");
		collection = await getFullCollection(userId);
	} catch (err) {
		console.error("something went wrong", err);
	}
	return NextResponse.json(collection);
}

export async function POST(req: NextRequest) {
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const gameId = params.get("gameId");
	const userId = params.get("userId");

	if (!userId) {
		return new NextResponse("not logged in, missing user id", { status: 401 });
	}

	if (!gameId) {
		return new NextResponse("gameId missing", { status: 404 });
	}

	try {
		const createCollection = await prisma.userGameCollection.create({
			data: {
				userId,
				gameId: Number(gameId),
			},
		});
		console.log(
			`added collection ${createCollection.userId}, ${createCollection.gameId}`
		);

		const resBody = JSON.stringify(createCollection);
		return new NextResponse(resBody, { status: 200 });
	} catch (err) {
		console.error("error when processing game collection creation", err);
		throw err;
	}
}

export async function DELETE(req: NextRequest) {
	const url = new URL(req.url);
	const params = new URLSearchParams(url.search);
	const gameId = params.get("gameId");
	const userId = params.get("userId");

	if (!userId) {
		return new NextResponse("not logged in, missing user id", { status: 401 });
	}

	if (!gameId) {
		try {
			const body = (await req.json()) as number[];
			if (!body) {
				return new NextResponse("gameIds missing", { status: 404 });
			}

			if (body.length === 0) {
				return new NextResponse("gameIds missing", { status: 404 });
			}

			const deleteManyGamesFromCollection =
				await prisma.userGameCollection.deleteMany({
					where: {
						userId,
						gameId: {
							in: body,
						},
					},
				});
			console.log(`deleted ${body.length} games from collection`);
			console.log(body);

			const resBody = JSON.stringify(deleteManyGamesFromCollection);
			return new NextResponse(resBody, { status: 200 });
		} catch (err) {
			console.error("Something went wrong", err);
			throw err;
		}
	}

	try {
		const deleteCollection = await prisma.userGameCollection.delete({
			where: {
				userId_gameId: {
					userId,
					gameId: Number(gameId),
				},
			},
		});
		console.log(
			`removed collection ${deleteCollection.userId}, ${deleteCollection.gameId}`
		);

		const resBody = JSON.stringify(deleteCollection);
		return new NextResponse(resBody, { status: 200 });
	} catch (err) {
		console.error("error when deleting game collection creation", err);
		throw err;
	}
}
