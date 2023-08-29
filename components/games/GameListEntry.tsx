import { GameWithCoverAndGenres, GameWithCoverGenresPlaylists } from "@/types";

interface GameListEntryProps {
  game: GameWithCoverAndGenres;
  children: React.ReactNode;
}
export function GameListEntry({ game, children }: GameListEntryProps) {
  return (
    <div className="relative flex w-full flex-row justify-between border p-3">
      <div className="flex flex-col space-y-1">
        <p className="text-xs font-bold">{game.title}</p>
        <p className="text-xs font-bold">
          <span className="text-red-300">rating: </span>
          {game.aggregatedRating}
        </p>
        <p className="text-xs font-bold">
          <span className="text-red-300">release date: </span>
          {game.releaseDate}
        </p>
      </div>
      {children}
    </div>
  );
}
