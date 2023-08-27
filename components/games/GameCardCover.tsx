import { GameWithCoverAndGenres, IGDBImage } from "@/types";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { RatingLine } from "./Rating";
import { UserRatingSlider } from "./UserRatingSlider";
import { GenreTags } from "./GenreTags";

interface GameCardCoverProps {
  game: GameWithCoverAndGenres;
  isCompleted?: boolean;
  children: React.ReactNode;
}

export function GameCardCover({ game, isCompleted, children }: GameCardCoverProps) {
  const size: IGDBImage = "720p";

  let borderStyle = "border hover:border-foreground";
  if (isCompleted) {
    borderStyle =
      "border border-lime-500/40 hover:border-lime-500 shadow-lg shadow-lime-500/20 hover:shadow-lime-500/40";
  } else if (game.aggregatedRating !== null && game.aggregatedRating > 95) {
    borderStyle =
      "border border-orange-500/40 hover:border-orange-500 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40";
  }

  let releaseDateStr = "";
  if (game.releaseDate === null) {
    releaseDateStr += "unknown release date..";
  } else {
    releaseDateStr = new Date(game.releaseDate * 1000).toDateString();
  }

  return (
    <div
      className={clsx(
        borderStyle,
        "relative flex max-w-sm flex-col items-center justify-between overflow-hidden rounded-lg text-foreground hover:bg-midnight-5"
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
      </Link>
        <div className="flex flex-col gap-y-3">
          <RatingLine
            percent={game.aggregatedRating ? game.aggregatedRating : 0}
            strokeWidth={2}
            strokeColor="#F0F757"
            trailColor=""
          />
          <UserRatingSlider />
          <GenreTags game={game} />
        </div>
      <div className="w-full content-start px-2 py-2 text-xs font-light text-foreground/90">
        {releaseDateStr}
      </div>
      {children}
    </div>
  );
}
