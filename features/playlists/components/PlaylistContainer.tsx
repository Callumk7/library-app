"use client";

import { GameWithCoverAndGenres } from "@/types";
import { PlaylistEntryControls } from "./PlaylistEntryControls";
import { useGamesFromPlaylistQuery } from "../hooks/queries";
import { useState } from "react";
import { SearchPopover } from "@/components/SearchPopover";
import { useSelectGames } from "@/features/collection/hooks/select";
import { CoverView } from "@/components/games/CoverView";
import { GameViewMenubar } from "@/features/collection/components/GameViewMenubar";
import { useFilter, useSort } from "@/features/collection/hooks/filtering";

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
}: PlaylistContainerProps) {
  const [viewIsCard, setViewIsCard] = useState<boolean>(true);
  const gamesFromPlaylistQuery = useGamesFromPlaylistQuery(userId, playlistId);

  let games = [];
  if (gamesFromPlaylistQuery.isLoading) {
    games = [];
  } else if (gamesFromPlaylistQuery.isSuccess) {
    games = gamesFromPlaylistQuery.data;
  }

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
    <>
      <div className="flex flex-row gap-x-4 align-middle">
        <GameViewMenubar
          userId={userId}
          selectedGames={selectedGames}
          handleSearchTermChanged={handleSearchTermChanged}
          searchTerm={searchTerm}
          handleSelectAll={handleSelectAll}
          handleUnselectAll={handleUnselectAll}
          viewIsCard={viewIsCard}
          handleToggleView={handleToggleView}
        />
        <SearchPopover userId={userId} playlistId={playlistId} />
      </div>
      <CoverView
        games={sortedGames}
        selectedGames={selectedGames}
        ControlComponent={PlaylistEntryControls}
        controlProps={{ playlistId, userId, handleSelectedToggled }}
      />
    </>
  );
}
