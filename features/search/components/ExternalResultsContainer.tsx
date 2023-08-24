import { GameCardArtwork } from "@/components/games/GameCardArtwork";
import { IGDBGame } from "@/types";
import { ExternalSearchResultControls } from "./ExternalSearchResultControls";

interface ExternalResultsContainerProps {
  results: IGDBGame[];
}

export function ExternalResultsContainer({ results }: ExternalResultsContainerProps) {
  return (
    <div className="flex flex-col gap-2">
      {results.map((game, index) => (
        <GameCardArtwork key={index} game={game}>
          <ExternalSearchResultControls gameId={game.id} game={game} />
        </GameCardArtwork>
      ))}
    </div>
  );
}
