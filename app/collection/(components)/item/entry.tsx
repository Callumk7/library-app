import { CollectionWithGamesAndGenre } from "@/types";
import Image from "next/image";
import Link from "next/link";

import { CardToolbar } from "./controls";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";

interface CollectionItemProps {
  entry: CollectionWithGamesAndGenre;
  handleRemoveEntry: (gameId: number) => Promise<void>;
  handlePlayedToggledEntry: (gameId: number) => Promise<void>;
}

export function CollectionEntry({
  entry,
  handleRemoveEntry,
  handlePlayedToggledEntry,
}: CollectionItemProps) {
  const handleRemoveClicked = async () => {
    await handleRemoveEntry(entry.gameId);
  };

  const handlePlayedToggled = async () => {
    await handlePlayedToggledEntry(entry.gameId);
  };

  const size = "720p";

  let borderStyle = "";
  if (entry) {
    borderStyle = "border-secondary/40 hover:border-secondary";
  } else {
    borderStyle = "hover:border-foreground";
  }

  return (
    <div
      className={clsx(
        borderStyle,
        "relative flex max-w-sm flex-col overflow-hidden rounded-lg border text-foreground"
      )}
    >
      <Checkbox className="absolute right-4 top-4 z-40" />
      <Link
        className="z-0 transition ease-in-out hover:opacity-30"
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
