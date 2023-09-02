"use client";

import { GameCardCover } from "@/components/games/GameCardCover";
import { GameWithCoverAndGenres } from "@/types";
import { PlaylistEntryControls } from "./PlaylistEntryControls";
import { CollectionViewMenubar } from "@/features/collection/components/CollectionViewMenubar";
import { useSortAndFilter } from "@/features/collection/hooks/filtering";
import { useGamesFromPlaylistQuery } from "../hooks/queries";
import { useState } from "react";
import { SearchPopover } from "@/components/SearchPopover";
import { useSelectGames } from "@/features/collection/hooks/select";

const DEFAULT_SORT_OPTION = "rating";

interface PlaylistContainerProps {
  userId: string;
  genres: string[];
  playlistId: number;
  games: GameWithCoverAndGenres[];
}

export function PlaylistContainer({
  userId,
  genres,
  playlistId,
  games,
}: PlaylistContainerProps) {
  const [viewIsCard, setViewIsCard] = useState<boolean>(true);
  const gamesFromPlaylistQuery = useGamesFromPlaylistQuery(userId, playlistId, games);

  const {
    searchTerm,
    sortOption,
    setSortOption,
    genreFilter,
    sortedCollection,
    handleSearchTermChanged,
    handleGenreToggled,
    handleToggleAllGenres,
  } = useSortAndFilter(DEFAULT_SORT_OPTION, genres, gamesFromPlaylistQuery.data!);

  const { selectedGames, handleSelectedToggled, handleSelectAll, handleUnselectAll } =
    useSelectGames(sortedCollection);

  const handleToggleView = () => {
    setViewIsCard(!viewIsCard);
  };

  return (
    <>
      <div className="flex flex-row align-middle gap-x-4">
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
        <SearchPopover userId={userId} />
      </div>
      <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {sortedCollection.map((game, index) => (
          <GameCardCover key={index} game={game} isSelected={false}>
            <PlaylistEntryControls
              playlistId={playlistId}
              game={game}
              userId={userId}
              handleSelectedToggled={handleSelectedToggled}
            />
          </GameCardCover>
        ))}
      </div>
    </>
  );
}
