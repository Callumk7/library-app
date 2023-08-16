"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { applySorting } from "@/util/sorting";

import { CollectionWithGamesGenresPlaylists, SortOption } from "@/types";
import { Playlist } from "@prisma/client";

import { queryClient } from "@/lib/db/query";
import { fetchFullCollection } from "../queries/query-functions";
import { CollectionViewMenubar } from "./CollectionViewMenubar";
import { GameCardCover } from "@/components/games/GameCardCover";
import { CollectionEntryControls } from "./CollectionEntryControls";

const DEFAULT_SORT_OPTION: SortOption = "rating";

interface CollectionContainerProps {
  userId: string;
  collection: CollectionWithGamesGenresPlaylists[];
  genres: string[];
  playlists: Playlist[];
}

export function ClientCollectionContainer({
  userId,
  collection,
  genres,
  playlists,
}: CollectionContainerProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT_OPTION);
  const [isPlayedFilterActive, setIsPlayedFilterActive] = useState<boolean>(false);
  const [genreFilter, setGenreFilter] = useState<string[]>(genres);

  const collectionQuery = useQuery({
    queryKey: ["collection", userId],
    queryFn: () => fetchFullCollection(userId),
    initialData: collection,
  });

  const deleteEntry = useMutation({
    mutationFn: (gameId: number) => {
      return fetch(`/api/collection/games/${gameId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
    },
  });

  // We have multiple stages to finalise the list order.
  // 1. filter out based on the search term.
  // 2. filter out based on played filter.
  // 3. filter out based on genre filter.
  const filteredCollection = useMemo(() => {
    let output = [...collectionQuery.data];
    if (searchTerm !== "") {
      output = output.filter((entry) =>
        entry.game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (isPlayedFilterActive) {
      output = output.filter((entry) => entry.played);
    }

    output = output.filter((entry) => {
      for (const genre of entry.game.genres) {
        if (genreFilter.includes(genre.genre.name)) {
          return true;
        }
      }
      return false;
    });
    return output;
  }, [searchTerm, isPlayedFilterActive, genreFilter, collectionQuery]);

  // ...following from the above useMemo, we sort the filtered list.
  // In this way, we don't recompute when not required.
  const sortedCollection = useMemo(() => {
    return applySorting(filteredCollection, sortOption);
  }, [filteredCollection, sortOption]);

  const handleSearchTermChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveEntry = (gameId: number) => {
    deleteEntry.mutate(gameId);
  };

  const handlePlayedFilterClicked = () => {
    setIsPlayedFilterActive(!isPlayedFilterActive);
  };

  const handleEntryPlayedToggled = async (gameId: number) => {
    // handle entry played
  };

  const handleGenreToggled = (genre: string) => {
  // handle genre toggled
  };

  const handleToggleAllGenres = () => {
    // handle toggle all genres
  };

  const handleGameAddedToPlaylist = async (playlistId: number, gameId: number) => {
    // handle this
  };

  const handleEntryCompletedToggled = async (gameId: number) => {
    // handle this
  };

  const handleBulkAddToPlaylist = async (gameId: number) => {
    // handle this
  };

  return (
    <>
      <CollectionViewMenubar
        genreFilter={genreFilter}
        genres={genres}
        playlists={playlists}
        handleSearchTermChanged={handleSearchTermChanged}
        searchTerm={searchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
        isPlayedFilterActive={isPlayedFilterActive}
        handlePlayedFilterClicked={handlePlayedFilterClicked}
        handleGenreToggled={handleGenreToggled}
        handleToggleAllGenres={handleToggleAllGenres}
        handleBulkAddToPlaylist={handleBulkAddToPlaylist}
      />
      <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {sortedCollection.map((entry, index) => (
          <GameCardCover
            key={index}
            game={entry.game}
            isCompleted={entry.completed}
          >
            <CollectionEntryControls
              entry={entry}
              playlists={playlists}
              handleEntryPlayedToggled={handleEntryPlayedToggled}
              handleEntryCompletedToggled={handleEntryCompletedToggled}
              handleGameAddedToPlaylist={handleGameAddedToPlaylist}
              handleRemoveEntry={handleRemoveEntry}
            />
          </GameCardCover>
        ))}
      </div>
    </>
  );
}
