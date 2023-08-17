import { Button } from "@/components/ui/button";
import { GameWithCoverAndGenres } from "@/types";
import { useAddToCollectionMutation } from "../queries/mutations";

interface SearchResultEntryControlsProps {
  userId: string;
  game: GameWithCoverAndGenres;
}

export function SearchResultEntryControls({
  userId,
  game,
}: SearchResultEntryControlsProps) {
  const addToCollection = useAddToCollectionMutation();
  return (
    <div>
      <Button onClick={() => addToCollection.mutate(game.gameId)}>Save game</Button>
    </div>
  );
}
