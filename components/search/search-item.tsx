"use client";

import { IGDBGame } from "@/types";
import Image from "next/image";

export interface SearchResultProps {
  game: IGDBGame;
}

export function SearchResult({ game }: SearchResultProps) {
  // HANDLERS
  const handleSave = async () => {
    // fetch request to the server
    const postRequest = await fetch(`/api/library/${game.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
    const revalidate = await fetch(`/api/revalidate`, {
      method: "GET",
    });
  };

  // image size fetched from IGDB
  const size = "cover_big";

  return (
    <div className="relative flex w-full flex-row overflow-hidden rounded-lg border text-foreground hover:border-foreground">
      <Image
        src={`https://images.igdb.com/igdb/image/upload/t_${size}/${game.cover?.image_id}.jpg`}
        alt="cover image"
        width={132}
        height={187}
      />
      <h1 className="mb-2 min-h-[40px]  font-bold lg:min-h-[60px]">{game.name}</h1>
      {game.genres && <p className="text-sm opacity-70">{game.genres[0].name}</p>}
      <button
        className="absolute bottom-4 right-4 w-fit rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover"
        onClick={handleSave}
      >
        save
      </button>
    </div>
  );
}
