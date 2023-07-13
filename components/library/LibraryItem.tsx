"use client";

import Image from "next/image";
import { LibraryItemProps } from "./library-view";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/lib/prisma/client";

export function LibraryItem({ item }: LibraryItemProps) {
  const supabase = createClientComponentClient();
  const size = "720p";

  const handleLike = async () => {
    const response = await fetch("http://localhost:3000/api/library", {
      method: "POST",
    })
  }
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg border text-foreground hover:border-foreground">
      <Image
        src={`https://images.igdb.com/igdb/image/upload/t_${size}/${item.cover?.image_id}.jpg`}
        alt="cover image"
        width={720}
        height={1280}
      />
      <div className="p-6">
        <h1 className="mb-2 min-h-[40px]  font-bold lg:min-h-[60px]">{item.name}</h1>
        {item.genres && <p className="text-sm opacity-70">{item.genres[0].name}</p>}
      </div>
      <button
        className="rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover"
        onClick={handleLike}
      >
        Like
      </button>
    </div>
  );
}
