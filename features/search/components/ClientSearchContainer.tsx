"use client";

import { GameCardCover } from "@/components/games/GameCardCover";
import { GameWithCoverAndGenres, GameWithCoverGenresUsers } from "@/types";
import { SearchResultEntryControls } from "./SearchResultEntryControls";
import { useDbSearchQuery } from "../hooks/queries";
import Searchbar from "@/features/navigation/components/Searchbar";

interface ClientSearchContainerProps {
  userId: string;
  resultsWithUsers: GameWithCoverGenresUsers[];
}

export function ClientSearchContainer({
  userId,
  resultsWithUsers,
}: ClientSearchContainerProps) {
  return (
    <>
      <Searchbar />
      <div className="mx-auto grid w-4/5 grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {resultsWithUsers.map((game, index) => (
          <GameCardCover key={index} game={game} isSelected={false} isCompleted={false}>
            <SearchResultEntryControls userId={userId} game={game} />
          </GameCardCover>
        ))}
      </div>
    </>
  );
}
