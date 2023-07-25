import { prisma } from "@/lib/prisma/client";
import { IGDBGame } from "@/types";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// Create new user game collection entry.
export async function POST(req: NextRequest, { params }: { params: { gameId: number } }) {
	const gameId = Number(params.gameId);
	const { userId } = auth();
	console.log(`POST request with id: ${gameId} from user${userId}`);

	const item: IGDBGame = await req.json();
	console.log(`item details recovered for game ${item.name}`);

	if (!userId) {
		return new NextResponse(null, {
			status: 401,
			statusText: "Not authorised; no user id",
		});
	}

	if (!item.cover) {
		return new NextResponse(null, { status: 404, statusText: "no cover found" });
	}

	// This prisma method will create or update the correct game entry, and add the user
	// to the userGameCollection table ( 'user' ). Currently not possible to create a
	// collection entry, and then upsert a game, which may be more performant
	const upsertGame = await prisma.game.upsert({
		where: {
			externalId: gameId,
		},
		update: {
			cover: {
				upsert: {
					create: {
						imageId: item.cover.image_id,
					},
					update: {},
				},
			},
			users: {
				connectOrCreate: {
					where: {
						clerkId_gameId: {
							clerkId: userId,
							gameId: gameId,
						},
					},
					create: {
						clerkId: userId,
					},
				},
			},
		},
		create: {
			externalId: gameId,
			title: item.name,
			cover: {
				create: {
					imageId: item.cover.image_id,
				},
			},
			users: {
				create: {
					clerkId: userId,
				},
			},
			releaseDate: item.first_release_date,
		},
		select: {
			users: true,
			id: true,
		},
	});

	// Verbose section to handle async updates if there is a
	// storyline and or aggregated rating available in the request.
	if (item.storyline && item.aggregated_rating) {
		await Promise.all([
			prisma.game.update({
				where: {
					id: upsertGame.id,
				},
				data: {
					storyline: item.storyline,
				},
			}),
			prisma.game.update({
				where: {
					id: upsertGame.id,
				},
				data: {
					aggregatedRating: item.aggregated_rating,
					aggregatedRatingCount: item.aggregated_rating_count,
				},
			}),
		]);
	} else if (item.storyline) {
		await prisma.game.update({
			where: {
				id: upsertGame.id,
			},
			data: {
				storyline: item.storyline,
			},
		});
	} else if (item.aggregated_rating) {
		await prisma.game.update({
			where: {
				id: upsertGame.id,
			},
			data: {
				aggregatedRating: item.aggregated_rating,
				aggregatedRatingCount: item.aggregated_rating_count,
			},
		});
	}


	console.log(
		`added collection ${upsertGame.users[0].clerkId}, ${upsertGame.users[0].gameId}`
	);
	
	// Handoff artwork and genre tasks to worker endpoints. This does not block
	// the end user, but error handling could become messy.

	// process artwork async
	const artworkHandoffPromise = fetch(`${process.env.APP_URL}/api/worker/${upsertGame.id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			handoffType: "artwork",
		},
		body: JSON.stringify(item),
	});

	// process genres async
	const genreHandoffPromise = fetch(`${process.env.APP_URL}/api/worker/${gameId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			handoffType: "genres",
		},
		body: JSON.stringify(item),
	});

	// const [artworkHandoffRes, genreHandoffRes] = await Promise.all([
	// 	artworkHandoffPromise,
	// 	genreHandoffPromise,
	// ]);
	// const artworkText = await artworkHandoffRes.text();
	// const genreText = await genreHandoffRes.text();
	// console.log(artworkText);
	// console.log(genreText);
	return NextResponse.json({ upsertGame });
}

// CURRENTLY JUST FOR PLAYED TOGGLING
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { gameId: number } }
) {
	const { userId } = auth();
	const gameId = Number(params.gameId);
	const body = await req.json();

	if (!userId) {
		return NextResponse.error();
	}

	if ("played" in body) {
		console.log(`PATCH REQUEST: ${userId}`);
		const likedGame = await prisma.userGameCollection.update({
			where: {
				clerkId_gameId: {
					clerkId: userId,
					gameId: gameId,
				},
			},
			data: {
				played: body.played,
			},
		});
		return NextResponse.json(likedGame);
	}
}

export async function DELETE(_req: Request, { params }: { params: { gameId: number } }) {
	const gameId = Number(params.gameId);
	const { userId } = auth();
	console.log(`DELETE request with id: ${gameId} from user${userId}`);

	if (!userId) {
		return NextResponse.error();
	}
	const deleteCollectionItem = await prisma.userGameCollection.delete({
		where: {
			clerkId_gameId: {
				gameId: gameId,
				clerkId: userId,
			},
		},
	});

	return NextResponse.json(deleteCollectionItem);
}
