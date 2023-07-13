// Prisma generated types
import { Prisma } from "@prisma/client";
import type { Cover, Game, Genre, User, UserGameCollection } from "@prisma/client";

const gameWithGenreAndCover = Prisma.validator<Prisma.GameArgs>()({
	include: {
		genre: true,
		cover: true,
	},
});

type GameWithGenreAndCover = Prisma.GameGetPayload<typeof gameWithGenreAndCover>;

type GameUpload = Prisma.GameCreateInput;

export { Cover, Game, Genre, User, UserGameCollection };
export type { GameUpload, GameWithGenreAndCover };

// IGDB database types
type IGDBGame = {
	id: number;
	url: string;
	genres?: {
		id: number;
		created_at: number;
		name: string;
		slug: string;
		updated_at: number;
		url: string;
		checksum: string;
	}[];
	name: string;
	cover?: {
		id: number;
		image_id: string;
	};
	storyline?: string;
};

export type { IGDBGame };
