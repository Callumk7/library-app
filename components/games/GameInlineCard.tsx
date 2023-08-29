import { IGDBGame, IGDBImage } from "@/types";

interface GameInlineCardProps {
  game: IGDBGame;
  children?: React.ReactNode;
}

export function GameInlineCard({ game, children }: GameInlineCardProps) {
  // image size fetched from IGDB
  const size: IGDBImage = "screenshot_med";

  return (
    <div className="flex w-full flex-row justify-between border p-3">
      <div className="flex flex-col space-y-1">
        <p className="text-xs font-bold">{game.name}</p>
        <p className="text-xs font-bold">
          <span className="text-red-300">rating: </span>
          {game.aggregated_rating}
        </p>
        <p className="text-xs font-bold">
          <span className="text-red-300">release date: </span>
          {game.first_release_date}
        </p>
      </div>
      {children}
    </div>
  );
}
