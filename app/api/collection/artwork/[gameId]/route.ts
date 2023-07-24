import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { gameId: number } }) {
	console.log("processing artwork...");
	const gameId = Number(params.gameId);
}
