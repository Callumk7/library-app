"use client";

import { CollectionWithGamesAndGenre, SortOption } from "@/types";
import { useMemo, useState } from "react";
import { applySorting } from "./sorting-util";
import CollectionControlBar from "./controls";
import { CollectionEntry } from "../item/entry";
import { GenreFilter } from "./genre-filter";

const DEFAULT_SORT_OPTION: SortOption = "nameAsc";

export function CollectionContainer({
  collection,
  genres,
}: {
  collection: CollectionWithGamesAndGenre[];
  genres: string[];
}) {
  const [collectionState, setCollectionState] =
    useState<CollectionWithGamesAndGenre[]>(collection);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT_OPTION);
  const [isPlayedFilterActive, setIsPlayedFilterActive] = useState<boolean>(false);

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
    return output;
  }, [collectionState, searchTerm, isPlayedFilterActive]);

  const sortedCollection = useMemo(() => {
    return applySorting(filteredCollection, sortOption);
  }, [filteredCollection, sortOption]);
  const handleSearchTermChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // HANDLERS
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

  const handlePlayedToggledEntry = async (gameId: number) => {
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

  return (
    <>
      <CollectionControlBar
        genres={genres}
        handleSearchTermChanged={handleSearchTermChanged}
        searchTerm={searchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
        isPlayedFilterActive={isPlayedFilterActive}
        handlePlayedFilterClicked={handlePlayedFilterClicked}
      />
      <GenreFilter genres={genres} />
      <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {sortedCollection.map((entry) => (
          <CollectionEntry
            key={entry.gameId}
            entry={entry}
            handleRemoveEntry={handleRemoveEntry}
            handlePlayedToggledEntry={handlePlayedToggledEntry}
          />
        ))}
      </div>
    </>
  );
}
