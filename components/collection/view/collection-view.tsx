"use client";

import { CollectionWithGames, SortOption } from "@/types";
import { useEffect, useState } from "react";
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
  const [sortedCollection, setSortedCollection] = useState<CollectionWithGames[]>(() => {
    const sortedCollection = applySorting(collectionState, DEFAULT_SORT_OPTION);
    return sortedCollection;
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("nameAsc");

  const [isPlayedFilterActive, setIsPlayedFilterActive] = useState<boolean>(false);

  // search, and isPlayed filtering is applied first, then remaining list
  // is sorted and returned based on sort option
  //
  // I SHOULD REDO THIS => STUTTER
  // I can change this to a handler, its not working as I like right now
  useEffect(() => {
    const searchedCollection = collectionState.filter(
      (entry) =>
        searchTerm === "" ||
        entry.game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    let filteredCollection;
    if (isPlayedFilterActive) {
      filteredCollection = searchedCollection.filter((entry) => entry.played === true);
    } else {
      filteredCollection = searchedCollection;
    }
    const sortedCollection = applySorting(filteredCollection, sortOption);
    setSortedCollection(sortedCollection);
  }, [collectionState, searchTerm, sortOption, isPlayedFilterActive]);

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

      const sortedCollection = applySorting(updatedCollection, sortOption);
      setSortedCollection(sortedCollection);

      return sortedCollection; // Return the sorted collection as the new state
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
        {sortedCollection.map((entry, index) => (
          <CollectionEntry
            key={index}
            entry={entry}
            handleRemoveEntry={handleRemoveEntry}
            handlePlayedToggledEntry={handlePlayedToggledEntry}
          />
        ))}
      </div>
    </>
  );
}
