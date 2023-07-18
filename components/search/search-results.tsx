import { IGDBGame } from "@/types";
import { SearchResult } from "./search-item";

interface SearchResultsProps {
  results: IGDBGame[];
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-y-4">
      {results.map((game, index) => (
        <SearchResult key={index} game={game} />
      ))}
    </div>
  );
}
