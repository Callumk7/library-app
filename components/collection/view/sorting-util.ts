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
		default:
			break;
	}
	return sortedCollection;
};
