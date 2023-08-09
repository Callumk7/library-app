"use client";

import { PlaylistWithGames } from "@/types";
import { useState } from "react";

interface PlayListContainerProps {
  playlists: PlaylistWithGames[];
}

export function PlayListContainer({ playlists }: PlayListContainerProps) {
  const [playlistState, setPlaylistState] = useState<PlaylistWithGames[]>(playlists);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
