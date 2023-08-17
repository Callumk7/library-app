"use client";

import { GameCardCover } from "@/components/games/GameCardCover";
import { fetchFullCollection } from "@/features/collection/queries/query-functions";
import { CollectionWithGamesGenresPlaylists, GameWithCoverAndGenres } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { SearchResultEntryControls } from "./SearchResultEntryControls";

interface ClientSearchContainerProps {
  userId: string;
  results: GameWithCoverAndGenres[];
  collection: CollectionWithGamesGenresPlaylists[];
}

export function ClientSearchContainer({
  userId,
  results,
  collection,
}: ClientSearchContainerProps) {
  // honestly we just need ids here, so will fix
  const collectionQuery = useQuery({
    queryKey: ["collection", userId],
    queryFn: () => fetchFullCollection(userId),
    initialData: collection,
  });

  return (
    <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-3">
      {results.map((game, index) => (
        <GameCardCover key={index} game={game} isCompleted={false}>
          <SearchResultEntryControls userId={userId} game={game} />
        </GameCardCover>
      ))}
    </div>
  );
}
