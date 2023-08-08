import { CollectionWithGamesAndGenre, SortOption } from "@/types";

export const applySorting = (
	collection: CollectionWithGamesAndGenre[],
	sortOption: SortOption
) => {
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

		default:
			break;
	}
	return sortedCollection;
};
