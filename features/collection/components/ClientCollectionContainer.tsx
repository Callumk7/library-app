"use client";

import {
  CollectionWithGamesGenresPlaylists,
  GameWithCoverGenresPlaylists,
  SortOption,
} from "@/types";

import { CollectionViewMenubar } from "./CollectionViewMenubar";
import { GameCardCover } from "@/components/games/GameCardCover";
import { CollectionEntryControls } from "./CollectionEntryControls";
import { useEffect, useState } from "react";
import { useSortAndFilter } from "../hooks/filtering";
import { useCollectionQuery } from "../hooks/queries";
import { GameInlineCard } from "@/components/games/GameInlineCard";
import { GameListEntry } from "@/components/games/GameListEntry";

const DEFAULT_SORT_OPTION: SortOption = "rating";

type View = "card" | "list";

interface CollectionContainerProps {
  userId: string;
  collection: CollectionWithGamesGenresPlaylists[];
  genres: string[];
}

export function ClientCollectionContainer({
  userId,
  genres,
  collection,
}: CollectionContainerProps) {
  const collectionQuery = useCollectionQuery(userId, collection);
  const [games, setGames] = useState<GameWithCoverGenresPlaylists[]>([]);
  const [viewIsCard, setViewIsCard] = useState<boolean>(true);

  // We need to extract the game types from the collection type
  useEffect(() => {
    const initGames: GameWithCoverGenresPlaylists[] = [];
    collectionQuery.data?.forEach((entry) => initGames.push(entry.game));
    setGames(initGames);
  }, [collectionQuery.data]);

  const {
    searchTerm,
    sortOption,
    setSortOption,
    checkedGames,
    genreFilter,
    sortedCollection,
    handleSearchTermChanged,
    handleCheckedToggled,
    handleCheckAll,
    handleUncheckAll,
    handleGenreToggled,
    handleToggleAllGenres,
  } = useSortAndFilter(DEFAULT_SORT_OPTION, genres, games);

  const handleToggleView = () => {
    setViewIsCard(!viewIsCard);
  };

  return (
    <>
      <CollectionViewMenubar
        userId={userId}
        checkedGames={checkedGames}
        genreFilter={genreFilter}
        genres={genres}
        handleSearchTermChanged={handleSearchTermChanged}
        searchTerm={searchTerm}
        sortOption={sortOption}
        handleCheckAll={handleCheckAll}
        handleUncheckAll={handleUncheckAll}
        setSortOption={setSortOption}
        handleGenreToggled={handleGenreToggled}
        handleToggleAllGenres={handleToggleAllGenres}
        viewIsCard={viewIsCard}
        handleToggleView={handleToggleView}
      />
      {collectionQuery.isSuccess && viewIsCard === true && (
        <div className="mx-auto grid w-4/5 grid-cols-1 gap-4 md:w-full md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {sortedCollection.map((game) => (
            <GameCardCover key={game.id} game={game}>
              <CollectionEntryControls
                userId={userId}
                game={game}
                checkedGames={checkedGames}
                handleCheckedToggled={handleCheckedToggled}
              />
            </GameCardCover>
          ))}
        </div>
      )}
      {collectionQuery.isSuccess && viewIsCard === false && (
        <div className="mx-auto flex flex-col w-full gap-4 md:w-full">
          {sortedCollection.map((game) => (
            <GameListEntry key={game.id} game={game}>
              <CollectionEntryControls
                userId={userId}
                game={game}
                checkedGames={checkedGames}
                handleCheckedToggled={handleCheckedToggled}
              />
            </GameListEntry>
          ))}
        </div>
      )}
    </>
  );
}
