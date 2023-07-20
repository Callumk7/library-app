"use client";

import { GameWithCoverAndCollection } from "@/types";
import CollectionItem from "./collection-item";

import { useState } from "react";

interface CollectionViewProps {
  content: GameWithCoverAndCollection[];
}
export function CollectionView({ content }: CollectionViewProps) {
  const [collection, setCollection] = useState(content);

  const handleRemove = async (itemId: number) => {
    const newCollection = collection.filter((game) => game.externalId !== itemId);
    setCollection(newCollection);
    const req = await fetch(`/api/library/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(req.status);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      {collection.map((item, index) => (
        <CollectionItem key={index} item={item} handleRemove={handleRemove} />
      ))}
    </div>
  );
}
