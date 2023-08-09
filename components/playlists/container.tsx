"use client";

import { GameWithCoverAndGenres, PlaylistWithGames } from "@/types";
import { useState } from "react";
import { GameCard } from "../games/game-cover";

interface PlaylistContainerProps {
  games: GameWithCoverAndGenres[]
}

export function PlaylistContainer({ games }: PlaylistContainerProps) {
  const [playlistState, setPlaylistState] = useState<GameWithCoverAndGenres[]>(games);

  return (
    <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {playlistState.map((game, index) => (
        <GameCard key={index} game={game}>
          <div>controls will go here</div>
        </GameCard>
      ))}
    </div>
  );
}
