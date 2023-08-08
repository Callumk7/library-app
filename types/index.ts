/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Prisma } from "@prisma/client";
import type { Cover, Game, Genre, User, UserGameCollection } from "@prisma/client";
import { z } from "zod";

const gameWithCover = Prisma.validator<Prisma.GameArgs>()({
	include: {
		cover: true,
	},
});

const gameWithCoverAndCollection = Prisma.validator<Prisma.GameArgs>()({
	include: {
		cover: true,
		users: {
			where: {
				userId: "unique string",
			},
		},
	},
});

const collectionWithGamesAndGenre = Prisma.validator<Prisma.UserGameCollectionArgs>()({
	include: {
		game: {
			include: {
				cover: true,
				genres: true,
			},
		},
	},
});

const fullGameDataModel = Prisma.validator<Prisma.GameArgs>()({
	include: {
		cover: true,
		genres: true,
		artworks: true,
		screenshots: true,
	},
});

type GameWithCover = Prisma.GameGetPayload<typeof gameWithCover>;
type GameWithCoverAndCollection = Prisma.GameGetPayload<
	typeof gameWithCoverAndCollection
>;
type CollectionWithGamesAndGenre = Prisma.UserGameCollectionGetPayload<
	typeof collectionWithGamesAndGenre
>;
type FullGameDataModel = Prisma.GameGetPayload<typeof fullGameDataModel>;

type GameUpload = Prisma.GameCreateInput;

export type { Cover, Game, Genre, User, UserGameCollection };
export type {
	GameUpload,
	GameWithCover,
	GameWithCoverAndCollection,
	CollectionWithGamesAndGenre,
	FullGameDataModel,
};

type SortOption = "nameAsc" | "nameDesc" | "releaseDate" | "rating";
export type { SortOption };

// zod validation, primarily for data returned from IGDB.
const genreType = z.object({
	id: z.number(),
	name: z.string(),
});

const coverType = z.object({
	id: z.number(),
	image_id: z.string(),
});

const screenshotType = z.object({
	id: z.number(),
	image_id: z.string(),
});

const artworkType = z.object({
	id: z.number(),
	image_id: z.string(),
});

const IGDBGameSchema = z.object({
	id: z.number(),
	genres: z.array(genreType).optional(),
	name: z.string(),
	cover: coverType,
	storyline: z.string().optional(),
	screenshots: z.array(screenshotType).optional(),
	artworks: z.array(artworkType),
	aggregated_rating: z.number().optional(),
	aggregated_rating_count: z.number().optional(),
	involved_companies: z.array(z.number()).optional(),
	first_release_date: z.number().optional(),
});

type IGDBGame = z.infer<typeof IGDBGameSchema>;

// IGDB database types
// type IGDBGame = {
// 	id: number;
// 	url: string;
// 	genres:
// 		| {
// 				id: number;
// 				name: string;
// 		  }[]
// 		| undefined;
// 	name: string;
// 	cover: {
// 		id: number;
// 		image_id: string;
// 	};
// 	storyline: string | undefined;
// 	screenshots:
// 		| {
// 				id: number;
// 				image_id: string;
// 		  }[]
// 		| undefined;
// 	artworks: {
// 		id: number;
// 		image_id: string;
// 	}[];
// 	aggregated_rating: number | undefined;
// 	aggregated_rating_count: number | undefined;
// 	involved_companies?: number[] | undefined;
// 	first_release_date: number;
// };
//
type IGDBImage =
	| "cover_small"
	| "screenshot_med"
	| "cover_big"
	| "logo_med"
	| "screenshot_big"
	| "screenshot_huge"
	| "thumb"
	| "micro"
	| "720p"
	| "1080p";

export { IGDBGameSchema };
export type { IGDBGame, IGDBImage };

// Search page types
interface GameSearchResult extends IGDBGame {
	isInCollectionOrSaving: CollectionState;
}

type CollectionState = true | false | "saving" | "removing";

export type { GameSearchResult, CollectionState };

export type Artwork = {
	type: "screenshot" | "artwork";
	image_id: string;
};

type Rating = {
	aggregated_rating: number;
	aggregated_rating_count: number;
};

type PayloadBodyProps = {
	genres?: {
		id: number;
		name: string;
	}[];
	artwork?: Artwork[];
	storyline?: string;
	rating?: Rating;
};

type Job = {
	id: number;
	type: "genre" | "artwork" | "storyline" | "rating";
	payload: {
		gameId: number;
	} & PayloadBodyProps;
};

export type { Job };
