import { CollectionWithGamesAndGenre } from "@/types";
import Image from "next/image";
import Link from "next/link";

import { CardToolbar } from "./card-toolbar";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";

interface CollectionEntry extends CollectionWithGamesAndGenre {
  isSelected: boolean;
}

interface CollectionItemProps {
  entry: CollectionEntry;
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

  entry.isSelected = true;

  const size = "720p";

  let borderStyle = "";
  if (entry.isSelected) {
    borderStyle = "border-secondary/40 hover:border-secondary";
  } else {
    borderStyle = "hover:border-foreground";
  }

  return (
    <div
      className={clsx(
        borderStyle,
        "relative flex flex-col overflow-hidden rounded-lg border text-foreground max-w-sm"
      )}
    >
      <Checkbox className="absolute right-4 top-4 z-40" />
      <Link
        className="transition ease-in-out hover:opacity-30 z-0"
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
        isPlayed={entry.played}
        handlePlayedToggled={handlePlayedToggled}
        handleRemoveClicked={handleRemoveClicked}
      ></CardToolbar>
    </div>
  );
}
