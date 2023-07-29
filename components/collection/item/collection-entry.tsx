import { CollectionWithGamesAndGenre } from "@/types";
import Image from "next/image";
import Link from "next/link";

import { CardToolbar } from "./card-toolbar";

interface CollectionItemProps {
  entry: CollectionWithGamesAndGenre;
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
      <Link
        className="transition ease-in-out hover:opacity-30"
        href={`/games/${entry.gameId}`}
      >
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_${size}/${entry.game.cover?.imageId}.jpg`}
          alt="cover image"
          width={720}
          height={1280}
        />
      </Link>
      <CardToolbar
        handlePlayedToggled={handlePlayedToggled}
        handleRemoveClicked={handleRemoveClicked}
      ></CardToolbar>
    </div>
  );
}
