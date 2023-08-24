import { CollectionWithGamesGenresPlaylists, SortOption } from "@/types";

export const applySorting = (
	collection: CollectionWithGamesGenresPlaylists[],
	sortOption: SortOption
): CollectionWithGamesGenresPlaylists[] => {
	const sortedCollection = [...collection];
	switch (sortOption) {
		case "nameAsc":
			sortedCollection.sort((a, b) =>
				a.game.title.toUpperCase().localeCompare(b.game.title.toUpperCase())
			);
			break;

		case "nameDesc":
			sortedCollection.sort((a, b) =>
				b.game.title.toUpperCase().localeCompare(a.game.title.toUpperCase())
			);
			break;

		case "rating": {
			let bRating = 0;
			let aRating = 0;
			sortedCollection.sort((a, b) => {
				if (b.game.aggregatedRating === null) {
					bRating = 0;
				} else {
					bRating = b.game.aggregatedRating;
				}

				if (a.game.aggregatedRating === null) {
					aRating = 0;
				} else {
					aRating = a.game.aggregatedRating;
				}
				return bRating - aRating;
			});
			break;
		}

		case "releaseDateAsc": {
			let bReleaseDate = 0;
			let aReleaseDate = 0;
			sortedCollection.sort((a, b) => {
				if (b.game.releaseDate === null) {
					bReleaseDate = 0;
				} else {
					bReleaseDate = b.game.releaseDate.valueOf();
				}
				if (a.game.releaseDate === null) {
					aReleaseDate = 0;
				} else {
					aReleaseDate = a.game.releaseDate.valueOf();
				}
				return aReleaseDate - bReleaseDate;
			});
			break;
		}
		case "releaseDateDesc": {
			let bReleaseDate = 0;
			let aReleaseDate = 0;
			sortedCollection.sort((a, b) => {
				if (b.game.releaseDate === null) {
					bReleaseDate = 0;
				} else {
					bReleaseDate = b.game.releaseDate.valueOf();
				}
				if (a.game.releaseDate === null) {
					aReleaseDate = 0;
				} else {
					aReleaseDate = a.game.releaseDate.valueOf();
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
