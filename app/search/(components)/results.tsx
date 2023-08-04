"use client";

import { GameSearchResult, IGDBGame } from "@/types";
import { SearchResult } from "./result";
import { useEffect, useState } from "react";

interface SearchResultsProps {
  results: IGDBGame[];
  collectionIds: number[];
}

export function SearchResults({ results, collectionIds }: SearchResultsProps) {
  const [collectionState, setCollectionState] = useState<number[]>(collectionIds);
  const [resultsState, setResultsState] = useState<GameSearchResult[]>([]);

  useEffect(() => {
    // In this effect, we are hydrating results with data the user's collection. each
    // results is given an isInCollectionOrSaving property.
    const initResultsState: GameSearchResult[] = [];
    for (const result of results) {
      if (collectionIds.includes(result.id)) {
        const statefulResult = {
          ...result,
          isInCollectionOrSaving: true,
        };

        initResultsState.push(statefulResult);
      } else {
        const statefulResult = {
          ...result,
          isInCollectionOrSaving: false,
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
          return { ...result, isInCollectionOrSaving: "saving" };
        }
        return result;
      });
    });

    try {
      const saveGameResponse = await fetch(`/api/collection/games?gameId=${gameId}`, {
        method: "POST",
      });

      console.log("success: ", saveGameResponse.status);

      // handle state
      setResultsState((prevState) => {
        return prevState.map((result) => {
          if (result.id === gameId) {
            return { ...result, isInCollectionOrSaving: true };
          }

          return result;
        });
      });
    } catch (err) {
      console.error("Error saving game to collection", err);

      setResultsState((prevState) => {
        return prevState.map((result) => {
          if (result.id === gameId) {
            return { ...result, isInCollectionOrSaving: false };
          }

          return result;
        });
      });
    }
  };

  const handleRemove = async (gameId: number) => {
    setResultsState((prevState) => {
      return prevState.map((result) => {
        if (result.id === gameId) {
          return { ...result, isInCollectionOrSaving: "removing" };
        }
        return result;
      });
    });

    try {
      // TODO: use search params and /games route instead
      const deleteResponse = await fetch(`/api/collection/games/${gameId}`, {
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        setResultsState((prevState) => {
          return prevState.map((result) => {
            if (result.id === gameId) {
              return { ...result, isInCollectionOrSaving: false };
            }

            return result;
          });
        });
      }
    } catch (err) {
      console.error("Error removing game from collection", err);
    }

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
