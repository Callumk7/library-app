"use client";

import { CollectionWithGamesGenresPlaylists, GameWithCoverGenresPlaylists, SortOption } from "@/types";

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
  const collectionQuery = useCollectionQuery(userId, collection);
  const games: GameWithCoverGenresPlaylists[] = []; 

  // We need to extract the game types from the collection type
  collectionQuery.data?.forEach(entry => games.push(entry.game))

  const {
    searchTerm,
    sortOption,
    setSortOption,
    checkedGames,
    genreFilter,
    sortedCollection,
    handleSearchTermChanged,
    handleCheckedToggled,
    handleCheckAll,
    handleUncheckAll,
    handleGenreToggled,
    handleToggleAllGenres,
  } = useSortAndFilter(DEFAULT_SORT_OPTION, genres, games);

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
        handleGenreToggled={handleGenreToggled}
        handleToggleAllGenres={handleToggleAllGenres}
      />
      <div className="mx-auto grid w-4/5 grid-cols-1 gap-4 md:w-full md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {sortedCollection.map((game, index) => (
          <GameCardCover key={index} game={game} >
            <CollectionEntryControls
              userId={userId}
              game={game}
              checkedGames={checkedGames}
              handleCheckedToggled={handleCheckedToggled}
            />
          </GameCardCover>
        ))}
      </div>
    </>
  );
}
