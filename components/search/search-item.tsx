"use client";

import { IGDBGame, IGDBImage } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Toast } from "../ui/Toast";
import { useState } from "react";

export function SearchResult({ game, included }: { game: IGDBGame; included?: boolean }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // HANDLERS
  const handleSave = async () => {
    // router.refresh();
    fetch("/api/revalidate");
    // no idea if this actually does anything useful, but its here
    const revalidate = await fetch(`/api/revalidate`, {
      method: "GET",
    });
    const data = await revalidate.json();
    console.log(data);
    const postRequest = await fetch(`/api/library/${game.id}`, {
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
      <Toast
        title={"new toast"}
        content={"saved to collection"}
        open={open}
        onOpenChange={setOpen}
      >
        <Button variant={"destructive"}>undo</Button>
      </Toast>
    </div>
  );
}
