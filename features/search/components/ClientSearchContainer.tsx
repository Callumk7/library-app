"use client";

import { GameWithCoverAndGenres, IGDBGame } from "@/types";
import { SearchResultEntryControls } from "./SearchResultEntryControls";
import { CoverView } from "@/components/games/CoverView";
import { ExternalCoverView } from "@/components/games/igdb/ExternalCoverView";
import { ExternalSearchResultControls } from "./ExternalSearchResultControls";
import { useFilter } from "@/features/collection/hooks/filtering";
import { GameViewMenubar } from "@/features/collection/components/GameViewMenubar";
import { useSelectGames } from "@/features/collection/hooks/select";
import { useIgdbSearchQuery } from "../hooks/queries";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ClientSearchContainerProps {
  userId: string;
  games: GameWithCoverAndGenres[];
  genres: string[];
}

export function ClientSearchContainer({
  userId,
  games,
  genres,
}: ClientSearchContainerProps) {
  const { filteredGames, searchTerm, handleSearchTermChanged } = useFilter(games, genres);

  const { selectedGames, handleSelectAll, handleUnselectAll } =
    useSelectGames(filteredGames);

  const [query, setQuery] = useState<string>("");
  const handleSubmitSearch = () => {
    setQuery(searchTerm);
  };

  const externalSearchQuery = useIgdbSearchQuery(query);

  return (
    <>
      <GameViewMenubar
        userId={userId}
        selectedGames={selectedGames}
        searchTerm={searchTerm}
        handleSelectAll={handleSelectAll}
        handleUnselectAll={handleUnselectAll}
        handleSearchTermChanged={handleSearchTermChanged}
        viewIsCard={true}
        handleToggleView={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="place-self-center">
        <h1>Find games to add to your collection</h1>
      </div>
      <CoverView
        games={filteredGames}
        selectedGames={selectedGames}
        ControlComponent={SearchResultEntryControls}
        controlProps={{ userId }}
      />
      <div className="place-self-center">
        <h1>Search IGDB to add games to our collection!</h1>
      </div>
      <Button onClick={handleSubmitSearch}>Search</Button>
      <ExternalCoverView
        games={externalSearchQuery.data ? externalSearchQuery.data : []}
        selectedGames={[]}
        ControlComponent={ExternalSearchResultControls}
        controlProps={{}}
      />
    </>
  );
}
