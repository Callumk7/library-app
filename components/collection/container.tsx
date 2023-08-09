"use client";

import { useMemo, useState } from "react";

import { CollectionWithGamesAndGenres, PlaylistWithGames, SortOption } from "@/types";

import { GameCard } from "../games/item/game-card";
import CollectionControlBar from "./collection-control-bar";
import { EntryControlBar } from "./entry-control-bar";

import { applySorting } from "@/util/sorting";

const DEFAULT_SORT_OPTION: SortOption = "rating";

interface CollectionContainerProps {
  collection: CollectionWithGamesAndGenres[];
  genres: string[];
  playlists: PlaylistWithGames[];
}

export function CollectionContainer({
  collection,
  genres,
  playlists,
}: CollectionContainerProps) {
  const [collectionState, setCollectionState] =
    useState<CollectionWithGamesAndGenres[]>(collection);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT_OPTION);
  const [isPlayedFilterActive, setIsPlayedFilterActive] = useState<boolean>(false);
  const [genreFilter, setGenreFilter] = useState<string[]>(genres);
  const [playlistsState, setPlaylistsState] = useState(playlists); // integrate state workflow for playlists

  // We have multiple stages to finalise the list order.
  // 1. filter out based on the search term.
  // 2. filter out based on played filter.
  // 3. filter out based on genre filter.
  const filteredCollection = useMemo(() => {
    let output = [...collectionState];
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
  }, [collectionState, searchTerm, isPlayedFilterActive, genreFilter]);

  // ...following from the above useMemo, we sort the filtered list.
  // In this way, we don't recompute when not required.
  const sortedCollection = useMemo(() => {
    return applySorting(filteredCollection, sortOption);
  }, [filteredCollection, sortOption]);

  // HANDLERS
  const handleSearchTermChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveEntry = async (gameId: number) => {
    const newCollection = collectionState.filter((entry) => entry.gameId !== gameId);
    setCollectionState(newCollection);
    const req = await fetch(`/api/collection/games/${gameId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(req.status);
  };

  const handlePlayedFilterClicked = () => {
    setIsPlayedFilterActive(!isPlayedFilterActive);
  };

  const handleEntryPlayedToggled = async (gameId: number) => {
    setCollectionState((prevState) => {
      const updatedCollection = prevState.map((entry) => {
        if (entry.gameId === gameId) {
          return { ...entry, played: !entry.played };
        }
        return entry;
      });

      return updatedCollection;
    });

    const prevState = collectionState.find((entry) => entry.gameId === gameId)?.played;
    try {
      const res = await fetch(`/api/collection/games/${gameId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ played: !prevState }),
      });
      console.log(res.status);
    } catch (err) {
      console.error("error updating server", err);
    }
  };

  const handleGenreToggled = (genre: string) => {
    setGenreFilter((prevGenreFilter) =>
      prevGenreFilter.includes(genre)
        ? prevGenreFilter.filter((g) => g !== genre)
        : [...prevGenreFilter, genre]
    );
  };

  const handleToggleAllGenres = () => {
    if (genres.length > genreFilter.length) {
      setGenreFilter(genres);
    } else {
      setGenreFilter([]);
    }
  };

  const handleGameAddedToPlaylist = async (playlistId: number, gameId: number) => {
    const res = await fetch(`/api/playlists/${playlistId}?gameId=${gameId}`, {
      method: "POST",
    });
  };

  return (
    <>
      <CollectionControlBar
        genreFilter={genreFilter}
        genres={genres}
        handleSearchTermChanged={handleSearchTermChanged}
        searchTerm={searchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
        isPlayedFilterActive={isPlayedFilterActive}
        handlePlayedFilterClicked={handlePlayedFilterClicked}
        handleGenreToggled={handleGenreToggled}
        handleToggleAllGenres={handleToggleAllGenres}
        playlists={playlists}
      />

      <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {sortedCollection.map((entry, index) => (
          <GameCard key={index} entry={entry}>
            <EntryControlBar
              gameId={entry.gameId}
              isPlayed={entry.played}
              playlists={playlists}
              handleRemoveEntry={handleRemoveEntry}
              handleEntryPlayedToggled={handleEntryPlayedToggled}
              handleGameAddedToPlaylist={handleGameAddedToPlaylist}
            />
          </GameCard>
        ))}
      </div>
    </>
  );
}
