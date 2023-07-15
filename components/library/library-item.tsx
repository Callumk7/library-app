"use client";

import Image from "next/image";
import { LibraryItemProps } from "./library-view";

export function LibraryItem({ item }: LibraryItemProps) {

  const handleSave = async () => {
    //handle save
    const request = await fetch(`/api/library/${item.id}`, {
      method: "POST"
    })
  }

  // image size fetched from IGDB
  const size = "720p";

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg border text-foreground hover:border-foreground">
      <Image
        src={`https://images.igdb.com/igdb/image/upload/t_${size}/${item.cover?.image_id}.jpg`}
        alt="cover image"
        width={720}
        height={1280}
      />
      <div className="p-6">
        <h1 className="mb-2 min-h-[40px]  font-bold lg:min-h-[60px]">
          {item.name}
        </h1>
        {item.genres && (
          <p className="text-sm opacity-70">{item.genres[0].name}</p>
        )}
      </div>
      <button className="absolute bottom-4 right-4 py-2 px-4 rounded-md w-fit no-underline bg-btn-background hover:bg-btn-background-hover" onClick={handleSave}>
        save
      </button>
    </div>
  );
}
