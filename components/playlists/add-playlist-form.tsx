"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/form";

export default function AddPlaylistForm() {
  const [playlistName, setPlaylistName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/playlists/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: playlistName }),
    });

    if (res.ok) {
      console.log("playlist created");
      setPlaylistName("");
    }
  };

  return (
      <form onSubmit={handleSubmit} className="flex flex-row items-center space-x-3">
        <Input
          value={playlistName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPlaylistName(e.target.value)
          }
          name="name"
          placeholder="Best RPGs ever.."
        />
        <Button variant={"outline"} size={"sm"}>
          Add
        </Button>
      </form>
  );
}
