/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Prisma } from "@prisma/client";
import type { Cover, Game, Genre, User, UserGameCollection } from "@prisma/client";

const gameWithGenreAndCover = Prisma.validator<Prisma.GameArgs>()({
	include: {
		genre: true,
		cover: true,
	},
});

const gameWithCover = Prisma.validator<Prisma.GameArgs>()({
	include: {
		cover: true,
	},
});

const gameWithCoverAndCollection = Prisma.validator<Prisma.GameArgs>()({
	include: {
		cover: true,
		UserGameCollection: {
			where: {
				clerkId: "user",
			},
		},
	},
});

type GameWithGenreAndCover = Prisma.GameGetPayload<typeof gameWithGenreAndCover>;
type GameWithCover = Prisma.GameGetPayload<typeof gameWithCover>;
type GameWithCoverAndCollection = Prisma.GameGetPayload<
	typeof gameWithCoverAndCollection
>;

type GameUpload = Prisma.GameCreateInput;

export type { Cover, Game, Genre, User, UserGameCollection };
export type {
	GameUpload,
	GameWithGenreAndCover,
	GameWithCover,
	GameWithCoverAndCollection,
};

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
