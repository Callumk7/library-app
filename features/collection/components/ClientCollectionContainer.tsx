"use client";

import { CollectionWithGamesGenresPlaylists, SortOption } from "@/types";

import { CollectionViewMenubar } from "./CollectionViewMenubar";
import { GameCardCover } from "@/components/games/GameCardCover";
import { CollectionEntryControls } from "./CollectionEntryControls";
import { useCollectionQuery } from "@/lib/hooks/queries";
import { useSortAndFilter } from "../hooks";

const DEFAULT_SORT_OPTION: SortOption = "rating";

interface CollectionContainerProps {
  userId: string;
  collection: CollectionWithGamesGenresPlaylists[];
  genres: string[];
}

export function ClientCollectionContainer({
  userId,
  collection,
  genres,
}: CollectionContainerProps) {

  const collectionQuery = useCollectionQuery(userId, collection)

  const {
		searchTerm,
		sortOption,
		setSortOption,
		checkedGames,
		isPlayedFilterActive,
		genreFilter,
		sortedCollection,
		handleSearchTermChanged,
		handleCheckedToggled,
		handleCheckAll,
		handleUncheckAll,
		handlePlayedFilterClicked,
		handleGenreToggled,
		handleToggleAllGenres
  } = useSortAndFilter(DEFAULT_SORT_OPTION, genres, collectionQuery.data!);

  return (
    <>
      <CollectionViewMenubar
        userId={userId}
        checkedGames={checkedGames}
        genreFilter={genreFilter}
        genres={genres}
        handleSearchTermChanged={handleSearchTermChanged}
        searchTerm={searchTerm}
        sortOption={sortOption}
        handleCheckAll={handleCheckAll}
        handleUncheckAll={handleUncheckAll}
        setSortOption={setSortOption}
        isPlayedFilterActive={isPlayedFilterActive}
        handlePlayedFilterClicked={handlePlayedFilterClicked}
        handleGenreToggled={handleGenreToggled}
        handleToggleAllGenres={handleToggleAllGenres}
      />
      <div className="mx-auto grid w-4/5 grid-cols-1 gap-4 md:w-full md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {sortedCollection.map((entry, index) => (
            <GameCardCover
              key={index}
              game={entry.game}
              isCompleted={entry.completed}
            >
              <CollectionEntryControls
                userId={userId}
                entry={entry}
                checkedGames={checkedGames}
                handleCheckedToggled={handleCheckedToggled}
              />
            </GameCardCover>
        ))}
      </div>
    </>
  );
}
