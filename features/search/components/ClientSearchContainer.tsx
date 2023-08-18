"use client";

import { GameCardCover } from "@/components/games/GameCardCover";
import {
  fetchCollectionIds,
  fetchFullCollection,
} from "@/features/collection/queries/query-functions";
import {
  CollectionWithGamesGenresPlaylists,
  GameWithCoverAndGenres,
  GameWithCoverGenresUsers,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { SearchResultEntryControls } from "./SearchResultEntryControls";
import { useEffect } from "react";

interface ClientSearchContainerProps {
  userId: string;
  results: GameWithCoverAndGenres[];
  resultsWithUsers: GameWithCoverGenresUsers[];
  collection: CollectionWithGamesGenresPlaylists[];
  collectionIds: number[];
}

export function ClientSearchContainer({
  userId,
  results,
  resultsWithUsers,
  collection,
  collectionIds,
}: ClientSearchContainerProps) {

  const collectionQuery = useQuery({
    queryKey: ["collection", userId],
    queryFn: () => fetchFullCollection(userId),
    initialData: collection,
  });

  return (
    <div className="mx-auto w-4/5 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {resultsWithUsers.map((game, index) => (
        <GameCardCover key={index} game={game} isCompleted={false}>
          <SearchResultEntryControls userId={userId} game={game} />
        </GameCardCover>
      ))}
    </div>
  );
}
