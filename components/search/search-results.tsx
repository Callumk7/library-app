"use client";

import { IGDBGame } from "@/types";
import { SearchResult } from "./search-item";
import { useEffect, useState } from "react";

interface SearchResultsProps {
  results: IGDBGame[];
  collectionIds: number[];
}

export function SearchResults({ results, collectionIds }: SearchResultsProps) {
  const [collectionState, setCollectionState] = useState<number[]>(collectionIds);
  const collectionLength = collectionState.length;

  const handleRemove = async (gameId: number) => {
    const deleteResponse = await fetch(`/api/collection/games/${gameId}`, {
      method: "DELETE",
    });
    setCollectionState(collectionState.filter((id) => id != gameId));
  };

  return (
    <div className="grid w-full grid-cols-3 gap-4 ">
      {collectionState.length > 0 && (
        <div className="relative left-5 top-5 h-fit w-fit rounded-full bg-lime-400 p-4">
          {collectionLength}
        </div>
      )}
      {results.map((game, index) => {
        if (collectionState.includes(game.id)) {
          return (
            <SearchResult
              key={index}
              game={game}
              handleRemove={handleRemove}
              included={true}
            />
          );
        } else {
          return (
            <SearchResult
              key={index}
              game={game}
              handleRemove={handleRemove}
              included={false}
            />
          );
        }
      })}
    </div>
  );
}
