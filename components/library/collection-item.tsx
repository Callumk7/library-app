"use client";

import { GameWithCover } from "@/types";
import Image from "next/image";

export default function CollectionItem({ item }: { item: GameWithCover }) {
  // HANDLERS
  const handleRemove = async () => {
    const request = await fetch(`/api/library/${item.externalId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const size = "720p";

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg border text-foreground hover:border-foreground">
      <Image
        src={`https://images.igdb.com/igdb/image/upload/t_${size}/${item.cover?.imageId}.jpg`}
        alt="cover image"
        width={720}
        height={1280}
      />
      <div className="p-6">
        <h1 className="mb-2 min-h-[40px]  font-bold lg:min-h-[60px]">{item.title}</h1>
      </div>
      <button
        className="absolute bottom-4 right-4 w-fit rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover"
        onClick={handleRemove}
      >
        remove
      </button>
    </div>
  );
}
