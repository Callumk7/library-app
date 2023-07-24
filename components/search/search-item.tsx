"use client";

import { IGDBGame, IGDBImage } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import { SearchToast } from "./search-toast";

export function SearchResult({ game, included }: { game: IGDBGame; included?: boolean }) {
  const [open, setOpen] = useState(false);

  // HANDLERS
  const handleSave = async () => {
    const postRequest = await fetch(`/api/collection/games/${game.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
    setOpen(true);
  };

  // image size fetched from IGDB
  const size: IGDBImage = "screenshot_med";

  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-lg border text-foreground hover:border-foreground">
      <Image
        src={`https://images.igdb.com/igdb/image/upload/t_${size}/${
          game.artworks![0].image_id
        }.jpg`}
        alt="cover image"
        width={569}
        height={320}
      />
      <div className="p-2">
        <h1 className="mb-1 font-bold">{game.name}</h1>
        {game.genres && <p className="text-sm opacity-70">{game.genres[0].name}</p>}
        {included && (
          <p className="text-sm font-semibold text-cyan-100">in your collection</p>
        )}
      </div>
      <Button
        className="absolute bottom-4 right-4"
        variant={included ? "destructive" : "outline"}
        onClick={handleSave}
      >
        save
      </Button>
      <SearchToast
        title={`${game.name} added`}
        content="find it in your collection"
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
