"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { applySorting } from "@/util/sorting";

import { CollectionWithGamesGenresPlaylists, SortOption } from "@/types";
import { Playlist } from "@prisma/client";

import { CollectionViewMenubar } from "./CollectionViewMenubar";
import { GameCardCover } from "@/components/games/GameCardCover";
import { CollectionEntryControls } from "./CollectionEntryControls";
import { fetchFullCollection, fetchUserGenres } from "../queries";

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
  const [checkedGames, setCheckedGames] = useState<number[]>([]);

  const collectionQuery = useQuery({
    queryKey: ["collection", userId],
    queryFn: () => fetchFullCollection(userId),
    initialData: collection,
  });

  // Will likely remove this, react query is probably too heavy here and provides very little value
  const genreQuery = useQuery({
    queryKey: ["genres", userId],
    queryFn: () => fetchUserGenres(userId),
    initialData: genres,
  });

  const [genreFilter, setGenreFilter] = useState<string[]>(genreQuery.data);

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

  const handleCheckedToggled = (gameId: number) => {
    if (checkedGames.includes(gameId)) {
      setCheckedGames(checkedGames.filter((game) => game !== gameId));
    } else {
      setCheckedGames([...checkedGames, gameId]);
    }
  };

  const handleCheckAll = () => {
    const collectionIds = collectionQuery.data.map((entry) => entry.gameId);
    console.log(collectionIds)
    setCheckedGames(collectionIds);
  };

  const handleUncheckAll = () => {
    setCheckedGames([]);
  };

  const handlePlayedFilterClicked = () => {
    setIsPlayedFilterActive(!isPlayedFilterActive);
  };

  const handleEntryPlayedToggled = async (gameId: number) => {
    // handle entry played
  };

  const handleGenreToggled = (genre: string) => {
    // handle genre toggled
    setGenreFilter((prevGenreFilter) =>
      prevGenreFilter.includes(genre)
        ? prevGenreFilter.filter((g) => g !== genre)
        : [...prevGenreFilter, genre]
    );
  };

  const handleToggleAllGenres = () => {
    // handle toggle all genres
    if (genres.length > genreFilter.length) {
      setGenreFilter(genres);
    } else {
      setGenreFilter([]);
    }
  };

  const handleGameAddedToPlaylist = async (playlistId: number, gameId: number) => {
    // handle this
  };

  const handleEntryCompletedToggled = async (gameId: number) => {
    // handle this
  };

  return (
    <>
      <CollectionViewMenubar
        userId={userId}
        checkedGames={checkedGames}
        genreFilter={genreFilter}
        genres={genres}
        playlists={playlists}
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
          <GameCardCover key={index} game={entry.game} isCompleted={entry.completed}>
            <CollectionEntryControls
              userId={userId}
              entry={entry}
              playlists={playlists}
              checkedGames={checkedGames}
              handleCheckedToggled={handleCheckedToggled}
              handleEntryPlayedToggled={handleEntryPlayedToggled}
              handleEntryCompletedToggled={handleEntryCompletedToggled}
            />
          </GameCardCover>
        ))}
      </div>
    </>
  );
}
