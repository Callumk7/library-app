import { GameWithCoverAndGenres, SortOption } from "@/types";

export const applySorting = (
	games: GameWithCoverAndGenres[],
	sortOption: SortOption
): GameWithCoverAndGenres[] => {
	const sortedCollection = [...games];
	switch (sortOption) {
		case "nameAsc":
			sortedCollection.sort((a, b) =>
				a.title.toUpperCase().localeCompare(b.title.toUpperCase())
			);
			break;

		case "nameDesc":
			sortedCollection.sort((a, b) =>
				b.title.toUpperCase().localeCompare(a.title.toUpperCase())
			);
			break;

		case "rating": {
			let bRating = 0;
			let aRating = 0;
			sortedCollection.sort((a, b) => {
				if (b.aggregatedRating === null) {
					bRating = 0;
				} else {
					bRating = b.aggregatedRating;
				}

				if (a.aggregatedRating === null) {
					aRating = 0;
				} else {
					aRating = a.aggregatedRating;
				}
				return bRating - aRating;
			});
			break;
		}

		case "releaseDateAsc": {
			let bReleaseDate = 0;
			let aReleaseDate = 0;
			sortedCollection.sort((a, b) => {
				if (b.releaseDate === null) {
					bReleaseDate = 0;
				} else {
					bReleaseDate = b.releaseDate.valueOf();
				}
				if (a.releaseDate === null) {
					aReleaseDate = 0;
				} else {
					aReleaseDate = a.releaseDate.valueOf();
				}
				return aReleaseDate - bReleaseDate;
			});
			break;
		}
		case "releaseDateDesc": {
			let bReleaseDate = 0;
			let aReleaseDate = 0;
			sortedCollection.sort((a, b) => {
				if (b.releaseDate === null) {
					bReleaseDate = 0;
				} else {
					bReleaseDate = b.releaseDate.valueOf();
				}
				if (a.releaseDate === null) {
					aReleaseDate = 0;
				} else {
					aReleaseDate = a.releaseDate.valueOf();
				}
				return bReleaseDate - aReleaseDate;
			});
			break;
		}
		default:
			break;
	}
	return sortedCollection;
};
