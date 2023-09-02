"use client";

import { GameWithCoverGenresPlaylists, SortOption } from "@/types";

import { CollectionViewMenubar } from "./CollectionViewMenubar";
import { GameCardCover } from "@/components/games/GameCardCover";
import { CollectionEntryControls } from "./CollectionEntryControls";
import { useEffect, useState } from "react";
import { useSortAndFilter } from "../hooks/filtering";
import { useCollectionQuery } from "../hooks/queries";
import { GameListEntry } from "@/components/games/GameListEntry";
import { useSelectGames } from "../hooks/select";
import { GenreFilter } from "./GenreFilter";
import { CoverView } from "@/components/games/CoverView";

const DEFAULT_SORT_OPTION: SortOption = "rating";

interface CollectionContainerProps {
  userId: string;
  genres: string[];
}

export function ClientCollectionContainer({ userId, genres }: CollectionContainerProps) {
  const collectionQuery = useCollectionQuery(userId);
  const [games, setGames] = useState<GameWithCoverGenresPlaylists[]>([]);
  const [viewIsCard, setViewIsCard] = useState<boolean>(true);

  // We need to extract the game types from the collection type
  useEffect(() => {
    const initGames: GameWithCoverGenresPlaylists[] = [];
    collectionQuery.data?.forEach((entry) => initGames.push(entry.game));
    setGames(initGames);
  }, [collectionQuery.data]);

  const {
    searchTerm,
    sortOption,
    setSortOption,
    genreFilter,
    sortedCollection,
    handleSearchTermChanged,
    handleGenreToggled,
    handleToggleAllGenres,
  } = useSortAndFilter(DEFAULT_SORT_OPTION, genres, games);

  const { selectedGames, handleSelectedToggled, handleSelectAll, handleUnselectAll } =
    useSelectGames(sortedCollection);

  const handleToggleView = () => {
    setViewIsCard(!viewIsCard);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-10">
      <GenreFilter
        genres={genres}
        genreFilter={genreFilter}
        handleToggleAllGenres={handleToggleAllGenres}
        handleGenreToggled={handleGenreToggled}
      />
      <CollectionViewMenubar
        userId={userId}
        selectedGames={selectedGames}
        genreFilter={genreFilter}
        genres={genres}
        handleSearchTermChanged={handleSearchTermChanged}
        searchTerm={searchTerm}
        sortOption={sortOption}
        handleSelectAll={handleSelectAll}
        handleUnselectAll={handleUnselectAll}
        setSortOption={setSortOption}
        handleGenreToggled={handleGenreToggled}
        handleToggleAllGenres={handleToggleAllGenres}
        viewIsCard={viewIsCard}
        handleToggleView={handleToggleView}
      />
      {collectionQuery.isSuccess && viewIsCard === true && (
        <CoverView
          games={sortedCollection}
          selectedGames={selectedGames}
          ControlComponent={CollectionEntryControls}
          controlProps={{userId, selectedGames, handleSelectedToggled}}
        />
      )}
      {collectionQuery.isSuccess && viewIsCard === false && (
        <div className="mx-auto flex w-full flex-col">
          {sortedCollection.map((game) => (
            <GameListEntry key={game.id} game={game}>
              <CollectionEntryControls
                userId={userId}
                game={game}
                selectedGames={selectedGames}
                handleSelectedToggled={handleSelectedToggled}
              />
            </GameListEntry>
          ))}
        </div>
      )}
    </div>
  );
}
