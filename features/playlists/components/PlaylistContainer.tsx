"use client";

import { GameCardCover } from "@/components/games/GameCardCover";
import { GameWithCoverAndGenres } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchGamesFromPlaylist } from "../queries";
import { PlaylistEntryControls } from "./PlaylistEntryControls";
import { CollectionViewMenubar } from "@/features/collection/components/CollectionViewMenubar";
import { useSortAndFilter } from "@/features/collection/hooks";
import { usePlaylistGamesQuery } from "@/lib/hooks/queries";

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
  const playlistGamesQuery = usePlaylistGamesQuery(userId, playlistId, games);

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
  } = useSortAndFilter(DEFAULT_SORT_OPTION, genres, playlistGamesQuery.data!);

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
      <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {sortedCollection.map((game, index) => (
          <GameCardCover key={index} game={game}>
            <PlaylistEntryControls
              playlistId={playlistId}
              game={game}
              userId={userId}
              handleCheckedToggled={handleCheckedToggled}
            />
          </GameCardCover>
        ))}
      </div>
    </>
  );
}
