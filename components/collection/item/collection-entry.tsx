import { CollectionWithGames } from "@/types";
import Image from "next/image";
import Link from "next/link";

import { CardToolbar } from "./card-toolbar";

interface CollectionItemProps {
  entry: CollectionWithGames;
  handleRemoveEntry: (gameId: number) => void;
  handlePlayedToggledEntry: (gameId: number) => void;
}

export default function CollectionEntry({
  entry,
  handleRemoveEntry,
  handlePlayedToggledEntry,
}: CollectionItemProps) {
  const handleRemoveClicked = () => {
    handleRemoveEntry(entry.gameId);
  };

  const handlePlayedToggled = () => {
    handlePlayedToggledEntry(entry.gameId);
  };

  const size = "720p";

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg border text-foreground hover:border-foreground">
      <Link href={`/collection/games/${entry.gameId}`}>
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_${size}/${entry.game.cover?.imageId}.jpg`}
          alt="cover image"
          width={720}
          height={1280}
        />
      </Link>
      <div className="p-6">
        <h1 className="mb-2 min-h-[40px]  font-bold lg:min-h-[60px]">
          {entry.game.title}
        </h1>
      </div>
      <CardToolbar
        played={entry.played}
        handlePlayedToggled={handlePlayedToggled}
        handleRemoveClicked={handleRemoveClicked}
      ></CardToolbar>
    </div>
  );
}
