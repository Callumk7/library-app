import { prisma } from "@/lib/prisma/client";
import { IGDBGame } from "@/types";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// Create new user game collection entry.
export async function POST(req: NextRequest, { params }: { params: { gameId: number } }) {
	console.time("game add route");
	const gameId = Number(params.gameId);
	const { userId } = auth();
	console.log(`POST request with id: ${gameId} from user${userId}`);

	const game: IGDBGame = await req.json();
	console.timeLog("game add route", "item parsed...");
	console.log(`item details recovered for game ${game.name}`);

	if (!userId) {
		return new NextResponse(null, {
			status: 401,
			statusText: "Not authorised; no user id",
		});
	}

	console.timeLog("game add route", "upsertCollection start..");
	const createCollection = await prisma.userGameCollection.create({
		data: {
			userId,
			gameId,
		},
		select: {
			userId: true,
			gameId: true,
		}
	});

	// const upsertCollection = await prisma.userGameCollection.upsert({
	// 	where: {
	// 		userId_gameId: {
	// 			userId,
	// 			gameId,
	// 		},
	// 	},
	// 	update: {},
	// 	create: {
	// 		user: {
	// 			connect: {
	// 				userId,
	// 			},
	// 		},
	// 		game: {
	// 			connectOrCreate: {
	// 				where: {
	// 					gameId,
	// 				},
	// 				create: {
	// 					gameId,
	// 					title: game.name,
	// 					cover: {
	// 						create: {
	// 							imageId: game.cover.image_id,
	// 						},
	// 					},
	// 					releaseDate: game.first_release_date,
	// 				},
	// 			},
	// 		},
	// 	},
	// 	select: {
	// 		gameId: true,
	// 		userId: true,
	// 	},
	// });
	console.timeLog("game add route", "upsertCollection completed");

	// This prisma method will create or update the correct game entry, and add the user
	// to the userGameCollection table ( 'user' ). Currently not possible to create a
	// collection entry, and then upsert a game, which may be more performant
	// const upsertGame = await prisma.game.upsert({
	// 	where: {
	// 		externalId: gameId,
	// 	},
	// 	update: {
	// 		cover: {
	// 			upsert: {
	// 				create: {
	// 					imageId: item.cover.image_id,
	// 				},
	// 				update: {},
	// 			},
	// 		},
	// 		users: {
	// 			connectOrCreate: {
	// 				where: {
	// 					clerkId_gameId: {
	// 						clerkId: userId,
	// 						gameId: gameId,
	// 					},
	// 				},
	// 				create: {
	// 					clerkId: userId,
	// 				},
	// 			},
	// 		},
	// 	},
	// 	create: {
	// 		externalId: gameId,
	// 		title: item.name,
	// 		cover: {
	// 			create: {
	// 				imageId: item.cover.image_id,
	// 			},
	// 		},
	// 		users: {
	// 			create: {
	// 				clerkId: userId,
	// 			},
	// 		},
	// 		releaseDate: item.first_release_date,
	// 	},
	// 	select: {
	// 		users: true,
	// 		id: true,
	// 	},
	// });
	// console.timeLog("game add route", "upsert game completed");

	// Verbose section to handle async updates if there is a
	// storyline and or aggregated rating available in the request.
	// if (item.storyline && item.aggregated_rating) {
	// 	await Promise.all([
	// 		prisma.game.update({
	// 			where: {
	// 				externalId: upsertCollection.gameId,
	// 			},
	// 			data: {
	// 				storyline: item.storyline,
	// 			},
	// 		}),
	// 		prisma.game.update({
	// 			where: {
	// 				externalId: upsertCollection.gameId,
	// 			},
	// 			data: {
	// 				aggregatedRating: item.aggregated_rating,
	// 				aggregatedRatingCount: item.aggregated_rating_count,
	// 			},
	// 		}),
	// 	]);
	// } else if (item.storyline) {
	// 	await prisma.game.update({
	// 		where: {
	// 			externalId: upsertCollection.gameId,
	// 		},
	// 		data: {
	// 			storyline: item.storyline,
	// 		},
	// 	});
	// } else if (item.aggregated_rating) {
	// 	await prisma.game.update({
	// 		where: {
	// 			externalId: upsertCollection.gameId,
	// 		},
	// 		data: {
	// 			aggregatedRating: item.aggregated_rating,
	// 			aggregatedRatingCount: item.aggregated_rating_count,
	// 		},
	// 	});
	// }

	console.log(
		`added collection ${createCollection.userId}, ${createCollection.gameId}`
	);

	// Handoff artwork and genre tasks to worker endpoints. This does not block
	// the end user, but error handling could become messy.

	// process storyline and ratings async
	const promises = [];
	if (game.storyline) {
		const storylineHandoffPromise = fetch(`${process.env.APP_URL}/api/worker/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				handoffType: "storyline",
			},
			body: JSON.stringify(game),
		});

		promises.push(storylineHandoffPromise);
	}

	if (game.aggregated_rating) {
		const ratingHandoffPromise = fetch(`${process.env.APP_URL}/api/worker/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				handoffType: "rating",
			},
			body: JSON.stringify(game),
		});
		promises.push(ratingHandoffPromise);
	}

	console.timeLog("game add route", "storyline and/or rating added");
	// process artwork async
	const artworkHandoffPromise = fetch(`${process.env.APP_URL}/api/worker/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			handoffType: "artwork",
		},
		body: JSON.stringify(game),
	});
	console.timeLog("game add route", "artwork promises created");
	promises.push(artworkHandoffPromise);

	// process genres async
	const genreHandoffPromise = fetch(`${process.env.APP_URL}/api/worker/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			handoffType: "genres",
		},
		body: JSON.stringify(game),
	});
	promises.push(genreHandoffPromise);
	console.timeLog("game add route", "genre promises created");

	await Promise.all(promises);
	console.timeEnd("game add route");
	return new NextResponse("game added successfully", {status: 200})
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
		const updatePlayedGame = await prisma.userGameCollection.update({
			where: {
				userId_gameId: {
					userId,
					gameId,
				},
			},
			data: {
				played: body.played,
			},
		});
		return NextResponse.json(updatePlayedGame);
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
			userId_gameId: {
				userId,
				gameId,
			},
		},
	});

	return NextResponse.json(deleteCollectionItem);
}
