import { IGDBGame } from "@/types";
import { SearchResult } from "./search-item";

interface SearchResultsProps {
  results: IGDBGame[];
  collectionIds: number[];
}

export function SearchResults({ results, collectionIds }: SearchResultsProps) {
  return (
    <div className="grid w-full grid-cols-3 gap-4 ">
      {results.map((game, index) => {
        if (collectionIds.includes(game.id)) {
          return <SearchResult key={index} game={game} included />;
        } else {
          return <SearchResult key={index} game={game} />;
        }
      })}
    </div>
  );
}
