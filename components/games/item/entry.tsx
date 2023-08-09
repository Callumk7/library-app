import { CollectionWithGamesAndGenres, PlaylistWithGames } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Circle } from "rc-progress";

import { CardToolbar } from "./controls";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";

interface CollectionItemProps {
  entry: CollectionWithGamesAndGenres;
  handleRemoveEntry: (gameId: number) => Promise<void>;
  handlePlayedToggledEntry: (gameId: number) => Promise<void>;
  playlists: PlaylistWithGames[];
}

export function CollectionEntry({
  entry,
  handleRemoveEntry,
  handlePlayedToggledEntry,
  playlists,
}: CollectionItemProps) {
  const handleRemoveClicked = async () => {
    await handleRemoveEntry(entry.gameId);
  };

  const handlePlayedToggled = async () => {
    await handlePlayedToggledEntry(entry.gameId);
  };

  const handleGameAddedToPlaylist = async (playlistId: number) => {
    const res = await fetch(`/api/playlists/${playlistId}?gameId=${entry.gameId}`, {
      method: "POST",
    });
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
        "relative flex max-w-sm flex-col justify-between overflow-hidden rounded-lg border text-foreground"
      )}
    >
      <Checkbox className="absolute right-4 top-4 z-40" />
      <Link
        className="group relative z-0 transition ease-in-out"
        href={`/games/${entry.gameId}`}
      >
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_${size}/${entry.game.cover?.imageId}.jpg`}
          alt="cover image"
          width={720}
          height={1280}
        />
        <Circle
          percent={entry.game.aggregatedRating!}
          strokeWidth={8}
          strokeColor="#F0F757"
          className="absolute left-2 top-2 h-10 w-10"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 opacity-0 transition ease-in-out group-hover:opacity-100">
          <div className="animate-pulse text-center text-4xl text-white">
            <div>{entry.game.title}</div>
          </div>
        </div>
      </Link>
      <div className="m-2 flex flex-wrap gap-1">
        {entry.game.genres.map((genre, index) => (
          <p
            className="inline rounded-md bg-gray-800 px-2 py-1 text-[10px] text-light/70"
            key={index}
          >
            {genre.genre.name}
          </p>
        ))}
      </div>
      <CardToolbar
        isPlayed={entry.played}
        handlePlayedToggled={handlePlayedToggled}
        handleRemoveClicked={handleRemoveClicked}
        handleGameAddedToPlaylist={handleGameAddedToPlaylist}
        playlists={playlists}
      ></CardToolbar>
    </div>
  );
}
