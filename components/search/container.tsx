"use client";

import { GameSearchResult, IGDBGame } from "@/types";
import { useEffect, useState } from "react";
import { GameCardArtwork } from "../games/game-artwork";
import { SearchResultControls } from "./result-controls";

interface SearchResultsProps {
  results: IGDBGame[];
  collectionIds: number[];
}

export function SearchContainer({ results, collectionIds }: SearchResultsProps) {
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

  const handleSaveToCollection = async (gameId: number) => {
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

  const handleRemoveFromCollection = async (gameId: number) => {
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
    <div className="w-4/5 flex flex-col space-y-2">
      {resultsState.map((game, index) => {
        return (
          <GameCardArtwork key={index} game={game}>
            <SearchResultControls
              game={game}
              handleSaveToCollection={handleSaveToCollection}
              handleRemoveFromCollection={handleRemoveFromCollection}
            />
          </GameCardArtwork>
        );
      })}
    </div>
  );
}
