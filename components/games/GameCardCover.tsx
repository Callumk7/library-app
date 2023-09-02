import { GameWithCoverAndGenres, IGDBImage } from "@/types";
import Image from "next/image";
import clsx from "clsx";
import { RatingLine } from "./Rating";
import { GameHoverCard } from "./GameHoverCard";

interface GameCardCoverProps {
  game: GameWithCoverAndGenres;
  isCompleted?: boolean;
  isSelected: boolean;
  children: React.ReactNode;
}

export function GameCardCover({
  game,
  isCompleted,
  isSelected,
  children,
}: GameCardCoverProps) {
  const size: IGDBImage = "720p";

  let borderStyle = "border hover:border-foreground";
  if (isSelected) {
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
    <div>
      <div
        className={clsx(
          borderStyle,
          "relative flex max-w-sm flex-col items-center justify-between overflow-hidden rounded-lg text-foreground"
        )}
      >
        <GameHoverCard game={game}>
          <Image
            src={`https://images.igdb.com/igdb/image/upload/t_${size}/${game.cover?.imageId}.jpg`}
            alt="cover image"
            width={720}
            height={1280}
          />
        </GameHoverCard>
        <div className="flex flex-col gap-y-3">
          <RatingLine
            percent={game.aggregatedRating ? game.aggregatedRating : 0}
            strokeWidth={2}
            strokeColor="#F0F757"
            trailColor=""
          />
        </div>
      </div>
      <div className="z-10 pt-3">{children}</div>
    </div>
  );
}
