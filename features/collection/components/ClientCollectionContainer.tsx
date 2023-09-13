"use client";

import { CollectionWithGamesGenresPlaylists, GameWithCoverGenresPlaylists, PlaylistWithGames, SortOption } from "@/types";

import { GameViewMenubar } from "./GameViewMenubar";
import { CollectionEntryControls } from "./CollectionEntryControls";
import { useEffect, useState } from "react";
import { getFullCollection, useCollectionQuery } from "../hooks/queries";
import { GameListEntry } from "@/components/games/GameListEntry";
import { useSelectGames } from "../hooks/select";
import { GenreFilter } from "./GenreFilter";
import { CoverView } from "@/components/games/CoverView";
import { useFilter, useSort } from "../hooks/filtering";
import { GameSortDropdown } from "./GameSortDropdown";
import { Playlist } from "@prisma/client";

const DEFAULT_SORT_OPTION: SortOption = "rating";

interface CollectionContainerProps {
  userId: string;
  genres: string[];
  fullCollection: CollectionWithGamesGenresPlaylists[];
  playlists: PlaylistWithGames[];
}

export function ClientCollectionContainer({ userId, genres, fullCollection, playlists }: CollectionContainerProps) {

  // Need to check what this is, and recalibrate
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
    genreFilter,
    filteredGames,
    handleSearchTermChanged,
    handleGenreToggled,
    handleToggleAllGenres,
  } = useFilter(games, genres);

  const { sortOption, setSortOption, sortedGames } = useSort(
    DEFAULT_SORT_OPTION,
    filteredGames
  );

  const { selectedGames, handleSelectedToggled, handleSelectAll, handleUnselectAll } =
    useSelectGames(sortedGames);

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
      <div className="flex flex-row space-x-6">
        <GameViewMenubar
          userId={userId}
          selectedGames={selectedGames}
          handleSearchTermChanged={handleSearchTermChanged}
          searchTerm={searchTerm}
          handleSelectAll={handleSelectAll}
          handleUnselectAll={handleUnselectAll}
          viewIsCard={viewIsCard}
          handleToggleView={handleToggleView}
          playlists={playlists}
        />
        <GameSortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      {collectionQuery.isSuccess && viewIsCard === true && (
        <CoverView
          games={sortedGames}
          selectedGames={selectedGames}
          ControlComponent={CollectionEntryControls}
          controlProps={{ userId, selectedGames, handleSelectedToggled }}
        />
      )}
      {collectionQuery.isSuccess && viewIsCard === false && (
        <div className="mx-auto flex w-full flex-col">
          {sortedGames.map((game) => (
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
