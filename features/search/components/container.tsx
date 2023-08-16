"use client";

import { GameSearchResult, IGDBGame } from "@/types";
import { useEffect, useState } from "react";
import { GameCardArtwork } from "../games/game-artwork";
import { SearchResultControls } from "./result-controls";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addGameToCollection, fetchCollectionIds } from "@/lib/db/collection/fetches";
import { getCollectionGameIds } from "@/lib/db/collection/queries";

interface SearchResultsProps {
  userId: string;
  results: IGDBGame[];
  collectionIds: number[];
}

export function SearchContainer({ userId, results, collectionIds }: SearchResultsProps) {
  // how do we replace these, when using React Query?
  const [resultsState, setResultsState] = useState<GameSearchResult[]>([]);

  const collectionIdQuery = useQuery({
    queryKey: ["collection", "ids", userId],
    queryFn: () => fetchCollectionIds(userId),
    initialData: collectionIds,
  });

  useEffect(() => {
    // In this effect, we are integrating results with data the user's collection. each
    // results is given an isInCollectionOrSaving property.
    // This is only necessary because we are fetching from the external source, not our
    // own database. This can change soon
    const initResultsState: GameSearchResult[] = [];
    for (const result of results) {
      if (collectionIdQuery.data.includes(result.id)) {
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
  }, [results, collectionIdQuery.data]);

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

  };

  return (
    <div className="flex w-4/5 flex-col space-y-2">
      {resultsState.map((game, index) => {
        return (
          <GameCardArtwork key={index} game={game}>
            <SearchResultControls
              userId={userId}
              game={game}
              handleRemoveFromCollection={handleRemoveFromCollection}
            />
          </GameCardArtwork>
        );
      })}
    </div>
  );
}
