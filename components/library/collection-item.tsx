"use client";

import { GameWithCover } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CollectionItem({ item }: { item: GameWithCover }) {
  // HANDLERS
  const handleRemove = async () => {
    const req = await fetch(`/api/library/${item.externalId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const size = "720p";

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg border text-foreground hover:border-foreground">
      <Link href={`/collection/${item.externalId}`}>
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_${size}/${item.cover?.imageId}.jpg`}
          alt="cover image"
          width={720}
          height={1280}
        />
      </Link>
      <div className="p-6">
        <h1 className="mb-2 min-h-[40px]  font-bold lg:min-h-[60px]">{item.title}</h1>
      </div>
      <Button onClick={handleRemove} className="absolute bottom-4 right-4">
        Remove
      </Button>
    </div>
  );
}
