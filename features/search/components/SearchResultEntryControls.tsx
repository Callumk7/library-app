import { Button } from "@/components/ui/button";
import { GameWithCoverAndGenres } from "@/types";
import { useAddToCollectionMutation } from "../queries/mutations";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "@/components/ui/toast";

interface SearchResultEntryControlsProps {
  userId: string;
  game: GameWithCoverAndGenres;
}

export function SearchResultEntryControls({
  userId,
  game,
}: SearchResultEntryControlsProps) {
  const addToCollection = useAddToCollectionMutation(userId);
  return (
    <>
      <div className="w-full px-2 py-1">
        <Button
          variant={addToCollection.isLoading ? "ghost" : "default"}
          onClick={() => addToCollection.mutate(game.gameId)}
        >
          {addToCollection.isLoading ? "adding.." : "add to collection"}
        </Button>
      </div>
      <Toast
        open={addToCollection.isSuccess}
        onOpenChange={() => console.log("open change")}
        variant={"default"}
      >
        <ToastTitle>{game.title} added to collection</ToastTitle>
        <ToastDescription>Well done lad</ToastDescription>
        <ToastClose />
      </Toast>
    </>
  );
}
