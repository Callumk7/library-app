import { GameWithCoverAndGenres, IGDBImage } from "@/types";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Tag } from "../ui/tag";
import { RatingLine } from "./Rating";

interface CollectionItemProps {
  game: GameWithCoverAndGenres;
  isCompleted: boolean;
  children: React.ReactNode;
}

export function GameCardCover({
  game,
  isCompleted,
  children,
}: CollectionItemProps) {
  const size: IGDBImage = "720p";

  let borderStyle = "border hover:border-foreground";
  if (isCompleted) {
    borderStyle =
      "border border-lime-500/40 hover:border-lime-500 shadow-lg shadow-lime-500/20 hover:shadow-lime-500/40";
  } else if (game.aggregatedRating !== null && game.aggregatedRating > 95) {
    borderStyle =
      "border border-orange-500/40 hover:border-orange-500 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40";
  }

  return (
    <div
      className={clsx(
        borderStyle,
        "relative flex max-w-sm flex-col items-center justify-between overflow-hidden rounded-lg text-foreground"
      )}
    >
      <Link
        className="group relative z-0 transition ease-in-out"
        href={`/games/${game.gameId}`}
      >
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_${size}/${game.cover?.imageId}.jpg`}
          alt="cover image"
          width={720}
          height={1280}
        />
        <RatingLine
          percent={game.aggregatedRating ? game.aggregatedRating : 0}
          strokeWidth={2}
          strokeColor="#F0F757"
          trailColor=""
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 transition ease-in-out group-hover:opacity-100">
          <div className="absolute bottom-3 left-3 text-l text-foreground">
            <div>{game.title.toUpperCase()}</div>
          </div>
        </div>
      </Link>
      <div className="m-2 flex flex-wrap gap-2">
        {game.genres.map((genre, index) => (
          <Tag key={index}>{genre.genre.name}</Tag>
        ))}
      </div>
      {children}
    </div>
  );
}
