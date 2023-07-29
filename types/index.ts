/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Prisma } from "@prisma/client";
import type { Cover, Game, Genre, User, UserGameCollection } from "@prisma/client";

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

type GameWithCover = Prisma.GameGetPayload<typeof gameWithCover>;
type GameWithCoverAndCollection = Prisma.GameGetPayload<
	typeof gameWithCoverAndCollection
>;
type CollectionWithGamesAndGenre = Prisma.UserGameCollectionGetPayload<
	typeof collectionWithGamesAndGenre
>;

type GameUpload = Prisma.GameCreateInput;

export type { Cover, Game, Genre, User, UserGameCollection };
export type {
	GameUpload,
	GameWithCover,
	GameWithCoverAndCollection,
	CollectionWithGamesAndGenre,
};

type SortOption = "nameAsc" | "nameDesc" | "releaseDate" | "score";
export type { SortOption };

// IGDB database types
type IGDBGame = {
	id: number;
	url: string;
	genres:
		| {
				id: number;
				name: string;
		  }[]
		| undefined;
	name: string;
	cover: {
		id: number;
		image_id: string;
	};
	storyline: string | undefined;
	screenshots:
		| {
				id: number;
				image_id: string;
		  }[]
		| undefined;
	artworks: {
		id: number;
		image_id: string;
	}[];
	aggregated_rating: number | undefined;
	aggregated_rating_count: number | undefined;
	involved_companies?: number[] | undefined;
	first_release_date: number;
};

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
	| "micro"
	| "720p"
	| "1080p";

export type { IGDBGame, IGDBImage };

// Search page types
interface GameSearchResult extends IGDBGame {
	toastOpen: boolean;
	collectionState: CollectionState;
}

type CollectionState = true | false | "saving";

export type { GameSearchResult, CollectionState };
