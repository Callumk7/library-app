"use client";

import { GameCardCover } from "@/components/games/GameCardCover";
import { GameWithCoverAndGenres, PlaylistWithGames } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchGamesFromPlaylist } from "../queries/query-functions";

interface PlaylistContainerProps {
  userId: string;
  playlistId: number;
  games: GameWithCoverAndGenres[];
}

export function PlaylistContainer({ userId, playlistId, games }: PlaylistContainerProps) {

  const playlistQuery = useQuery({
    queryKey: ["playlists", playlistId, userId],
    queryFn: () => fetchGamesFromPlaylist(userId, playlistId),
    initialData: games
  });

  return (
    <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {playlistQuery.data.map((game, index) => (
        <GameCardCover key={index} game={game} isCompleted={false}>
          <div>controls will go here</div>
        </GameCardCover>
      ))}
    </div>
  );
}
