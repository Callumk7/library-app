"use client";

import { GameWithCoverAndCollection } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CollectionItem from "../item/collection-item";
import CollectionSearch from "./collection-search";
import { Button } from "@/components/ui/button";

interface CollectionViewProps {
  content: GameWithCoverAndCollection[];
}

export function CollectionView({ content }: CollectionViewProps) {
  const [collection, setCollection] = useState(content);
  const [filteredCollection, setFilteredCollection] = useState(content);
  const [searchTerm, setSearchTerm] = useState("");

  // sorting options
  type SortOption = "nameAsc" | "nameDesc" | "releaseDate" | "score";
  const [sortOption, setSortOption] = useState<SortOption>("nameAsc");

  // this is silly..
  // seems to sort a problem with the production build not
  // updating from the server, due to configuration issues
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

  useEffect(() => {
    switch (sortOption) {
      case "nameAsc":
        setFilteredCollection(
          filteredCollection.sort((a, b) =>
            a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1
          )
        );
        break;

      case "nameDesc":
        setFilteredCollection(
          filteredCollection.sort((a, b) =>
            a.title.toUpperCase() > b.title.toUpperCase() ? -1 : 1
          )
        );
        break;
      default:
        break;
    }
  }, [sortOption, filteredCollection, collection]);

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
      <div className="flex flex-row space-x-6">
        <CollectionSearch
          handleSearchTermChanged={handleSearchTermChanged}
          searchTerm={searchTerm}
        />
        <Button
          variant={"outline"}
          onClick={
            sortOption === "nameAsc"
              ? () => setSortOption("nameDesc")
              : () => setSortOption("nameAsc")
          }
        >
          {sortOption === "nameAsc" ? "asc" : "desc"}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredCollection.map((item, index) => (
          <CollectionItem key={index} item={item} handleRemove={handleRemove} />
        ))}
      </div>
    </>
  );
}
