import { GameWithCoverAndCollection } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

import { PlayIcon } from "../ui/icons/PlayIcon";
import { useState } from "react";

interface CollectionItemProps {
  item: GameWithCoverAndCollection;
  handleRemove: (itemId: number) => void;
}

export default function CollectionItem({ item, handleRemove }: CollectionItemProps) {
  const [played, setPlayed] = useState(item.UserGameCollection[0].played);

  const handleRemoveClicked = () => {
    handleRemove(item.externalId);
  };

  const handlePlayedToggled = async () => {
    setPlayed(!played);
    const res = await fetch(`/api/library/${item.externalId}`, {
      method: "PATCH",
      body: JSON.stringify({ played: !played }),
    });
    const json = await res.json();
    console.log(json);
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
      <Button onClick={handleRemoveClicked} className="absolute bottom-4 right-4">
        Remove
      </Button>
      {played ? (
        <PlayIcon
          handleClick={handlePlayedToggled}
          className="absolute bottom-4 left-4 text-white"
        />
      ) : (
        <PlayIcon
          handleClick={handlePlayedToggled}
          className="absolute bottom-4 left-4 text-red-500"
        />
      )}
    </div>
  );
}
