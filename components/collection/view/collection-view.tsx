"use client";

import { CollectionWithGames, SortOption } from "@/types";
import { useEffect, useMemo, useState } from "react";
import CollectionSearch from "./collection-search";
import { Button } from "@/components/ui/button";
import CollectionEntry from "../item/collection-entry";
import { applySorting } from "./sorting-util";

const DEFAULT_SORT_OPTION: SortOption = "nameAsc";

export function CollectionView({ collection }: { collection: CollectionWithGames[] }) {
  const [collectionState, setCollectionState] =
    useState<CollectionWithGames[]>(collection);

  // use a function to set initial state for the sorted collection. This fixes
  // a flicker/glitch when the page loaded, and then default sorting was applied
  // after the fact.

  // const [sortedCollection, setSortedCollection] = useState<CollectionWithGames[]>(() => {
  //   const sortedCollection = applySorting(collectionState, DEFAULT_SORT_OPTION);
  //   return sortedCollection;
  // });

  // const [filteredCollection, setFilteredCollection] =
  //   useState<CollectionWithGames[]>(collectionState);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("nameAsc");

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

  // handling changes to the search term...
  // useEffect(() => {
  //   let result = collectionState;
  //   if (searchTerm !== "") {
  //     result = result.filter((entry) =>
  //       entry.game.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }
  //
  //   if (isPlayedFilterActive) {
  //     result = result.filter((entry) => entry.played);
  //   }
  //
  //   setFilteredCollection(result);
  // }, [collectionState, searchTerm, isPlayedFilterActive]);

  // handling changes to the sort order...
  // useEffect(() => {
  //   const sorted = applySorting(filteredCollection, sortOption);
  //   setSortedCollection(sorted);
  // }, [filteredCollection, sortOption]);

  // useEffect(() => {
  //   const searchedCollection = collectionState.filter(
  //     (entry) =>
  //       searchTerm === "" ||
  //       entry.game.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   let filteredCollection;
  //   if (isPlayedFilterActive) {
  //     filteredCollection = searchedCollection.filter((entry) => entry.played === true);
  //   } else {
  //     filteredCollection = searchedCollection;
  //   }
  //   const sortedCollection = applySorting(filteredCollection, sortOption);
  //   setSortedCollection(sortedCollection);
  // }, [collectionState, searchTerm, sortOption, isPlayedFilterActive]);

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
        body: JSON.stringify({ played: !prevState }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      console.log(json);
    } catch (error) {
      console.log("FUCK!!!");
    }
  };

  return (
    <>
      <div className="flex flex-row space-x-6">
        <CollectionSearch
          handleSearchTermChanged={handleSearchTermChanged}
          searchTerm={searchTerm}
        />
        <Button
          variant={"outline"}
          onClick={
            sortOption === "nameAsc"
              ? () => setSortOption("nameDesc")
              : () => setSortOption("nameAsc")
          }
        >
          {sortOption === "nameAsc" ? "asc" : "desc"}
        </Button>
        <Button
          variant={isPlayedFilterActive ? "default" : "outline"}
          onClick={() => setIsPlayedFilterActive(!isPlayedFilterActive)}
        >
          played
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
