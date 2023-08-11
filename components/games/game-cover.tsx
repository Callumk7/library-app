import { GameWithCoverAndGenres, IGDBImage } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Circle } from "rc-progress";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";

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
  }

  return (
    <div
      className={clsx(
        borderStyle,
        "relative flex max-w-sm flex-col justify-between overflow-hidden rounded-lg text-foreground"
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
        <Circle
          percent={game.aggregatedRating!}
          strokeWidth={8}
          strokeColor="#F0F757"
          className="absolute left-2 top-2 h-10 w-10"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 opacity-0 transition ease-in-out group-hover:opacity-100">
          <div className="animate-pulse text-center text-4xl text-white">
            <div>{game.title}</div>
          </div>
        </div>
      </Link>
      <div className="m-2 flex flex-wrap gap-1">
        {game.genres.map((genre, index) => (
          <p
            className="inline rounded-md bg-gray-800 px-2 py-1 text-[10px] text-light/70"
            key={index}
          >
            {genre.genre.name}
          </p>
        ))}
      </div>
      {children}
    </div>
  );
}
