import { GameWithCoverAndGenres } from "@/types";
import { GameCard } from "../games/game-cover";

interface ClientSearchContainerProps {
  results: GameWithCoverAndGenres[];
}

export function ClientSearchContainer({ results }: ClientSearchContainerProps) {
  return (
    <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-3">
      {results.map((game, index) => (
        <GameCard key={index} game={game} isCompleted={false} isStarred={false}>
          <div>search controls</div>
        </GameCard>
      ))}
    </div>
  );
}
