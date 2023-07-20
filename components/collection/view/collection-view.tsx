"use client";

import { GameWithCoverAndCollection } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CollectionItem from "../item/collection-item";
import CollectionSearch from "./collection-search";

interface CollectionViewProps {
  content: GameWithCoverAndCollection[];
}
export function CollectionView({ content }: CollectionViewProps) {
  const [collection, setCollection] = useState(content);
  const [filteredCollection, setFilteredCollection] = useState(content);
  const [searchTerm, setSearchTerm] = useState("");

  // this is silly
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  });

  useEffect(() => {
    const newFilteredCollection = collection.filter((game) => {
      if (searchTerm === "") {
        return game;
      } else if (game.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return game;
      }
    });
    setFilteredCollection(newFilteredCollection);
  }, [collection, searchTerm]);

  const handleSearchTermChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
    <>
      <CollectionSearch
        handleSearchTermChanged={handleSearchTermChanged}
        searchTerm={searchTerm}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredCollection.map((item, index) => (
          <CollectionItem key={index} item={item} handleRemove={handleRemove} />
        ))}
      </div>
    </>
  );
}
