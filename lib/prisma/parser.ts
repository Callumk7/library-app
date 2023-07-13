import { Game, GameUpload, GameWithGenreAndCover, IGDBGame } from "@/types";
import { Prisma } from "@prisma/client";

export function convertIGDBgameToDBGame(games: IGDBGame[]): GameUpload[] {
	let returnGames: GameUpload[] = [];
	for (const game of games) {
		const { id, name, genres, cover } = game;
		const formattedGame: GameUpload = {
			externalId: id,
			title: name,
		};
	}
}
