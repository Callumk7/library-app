"use client";

import { GameSearchResult, IGDBGame } from "@/types";
import { SearchResult } from "./search-item";
import { useEffect, useState } from "react";

interface SearchResultsProps {
  results: IGDBGame[];
  collectionIds: number[];
}

export function SearchResults({ results, collectionIds }: SearchResultsProps) {
  const [collectionState, setCollectionState] = useState<number[]>(collectionIds);
  const [resultsState, setResultsState] = useState<GameSearchResult[]>([]);

  // add collection state (RENAME) and toast controller on component load
  useEffect(() => {
    const initResultsState: GameSearchResult[] = [];
    for (const result of results) {
      if (collectionIds.includes(result.id)) {
        const statefulResult = {
          ...result,
          toastOpen: false,
          collectionState: true,
        };

        initResultsState.push(statefulResult);
      } else {
        const statefulResult = {
          ...result,
          toastOpen: false,
          collectionState: false,
        };

        initResultsState.push(statefulResult);
      }
    }

    setResultsState(initResultsState);
  }, [results, collectionIds]);

  const handleSave = async (gameId: number) => {
    // set state to saving, try the database, update to saved or reset.
    setResultsState((prevState) => {
      return prevState.map((result) => {
        if (result.id === gameId) {
          return { ...result, collectionState: "saving" };
        }
        return result;
      });
    });
    try {
      const saveGameResponse = await fetch(`/api/collection/games/${gameId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(results.find((game) => game.id === gameId)),
      });
      console.log("success: ", saveGameResponse.status);
      // handle state
      setResultsState((prevState) => {
        return prevState.map((result) => {
          if (result.id === gameId) {
            return { ...result, collectionState: true };
          }
          return result;
        });
      });
      return saveGameResponse;
    } catch (err) {
      console.error("Error saving game to collection", err);
      setResultsState((prevState) => {
        return prevState.map((result) => {
          if (result.id === gameId) {
            return { ...result, collectionState: false };
          }
          return result;
        });
      });
    }
  };

  const handleRemove = async (gameId: number) => {
    // TODO: handle response
    const deleteResponse = await fetch(`/api/collection/games/${gameId}`, {
      method: "DELETE",
    });

    setCollectionState(collectionState.filter((game) => game != gameId));
  };

  return (
    <div className="grid w-full grid-cols-3 gap-4 md:grid-cols-2">
      {resultsState.map((game, index) => {
        return (
          <SearchResult
            key={index}
            game={game}
            handleSave={handleSave}
            handleRemove={handleRemove}
          />
        );
      })}
    </div>
  );
}
