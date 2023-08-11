import { GameWithCoverAndGenres, IGDBImage } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Line } from "rc-progress";
import clsx from "clsx";
import { Tag } from "../ui/tag";

interface CollectionItemProps {
  game: GameWithCoverAndGenres;
  isCompleted: boolean;
  isStarred: boolean;
  children: React.ReactNode;
}

export function GameCard({
  game,
  isCompleted,
  isStarred,
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
        <Line
          percent={game.aggregatedRating ? game.aggregatedRating : 0}
          strokeWidth={2}
          strokeColor="#F0F757"
          trailColor=""
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 opacity-0 transition ease-in-out group-hover:opacity-100">
          <div className="animate-pulse text-center text-4xl text-white">
            <div>{game.title}</div>
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
