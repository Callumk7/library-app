"use client";

import { ReactNode, useState } from "react";
import CreatePlaylistForm from "./create-playlist-form";
import PlaylistView from "./playlist-view";

async function createPlaylist(name: string) {
  const body = { name: name };
  const newPlaylist = await fetch("/api/playlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await newPlaylist.json();
  console.log(json);
}

export default function PlayListContainer({ children }: { children: ReactNode }) {
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");

  const handleSubmit = async () => {
    await createPlaylist(newPlaylistName);
  };

  const handleChange = (name: string) => {
    setNewPlaylistName(name);
  };

  return (
    <div>
      <CreatePlaylistForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newPlaylistName={newPlaylistName}
      />
      {children}
    </div>
  );
}
