"use client";

import { GameCardCover } from "@/components/games/GameCardCover";
import { GameWithCoverAndGenres, GameWithCoverGenresUsers } from "@/types";
import { SearchResultEntryControls } from "./SearchResultEntryControls";
import { useDbSearchQuery } from "../hooks/queries";
import Searchbar from "@/features/navigation/components/Searchbar";
import { CoverView } from "@/components/games/CoverView";

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
      <div className="container flex max-w-md flex-col gap-1 rounded-md border p-1">
        <h1 className="pb-2 font-poppins font-semibold">
          Find games to add to your collection
        </h1>
        <p className="">
          If you can&apos;t find what you are looking for below, have a look at the sidebar
          where you can save games from somewhere else to our database
        </p>
      </div>
      <Searchbar />
      <CoverView games={resultsWithUsers} selectedGames={[]} ControlComponent={SearchResultEntryControls} controlProps={{userId}} />
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
