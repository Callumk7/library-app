import { IGDBGame } from "@/types";
import { ExternalSearchResultControls } from "./ExternalSearchResultControls";
import { GameInlineCard } from "@/components/games/GameInlineCard";

interface ExternalResultsContainerProps {
  results: IGDBGame[];
}

export function ExternalResultsContainer({ results }: ExternalResultsContainerProps) {
  return (
    <div className="flex flex-col gap-2">
      {results.map((game, index) => (
        <GameInlineCard key={index} game={game}>
          <ExternalSearchResultControls gameId={game.id} game={game} />
        </GameInlineCard>
      ))}
    </div>
  );
}
