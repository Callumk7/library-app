import { GameSearchResult } from "@/types";
import { useState } from "react";
import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/db/query";
import { addGameToCollection } from "@/features/collection/queries/query-functions";
import { Button } from "@/components/ui/button";

interface SearchResultControlsProps {
  userId: string;
  game: GameSearchResult;
  handleRemoveFromCollection: (gameId: number) => Promise<void>;
}

export function SearchResultControls({
  userId,
  game,
  handleRemoveFromCollection,
}: SearchResultControlsProps) {
  const [saveToastOpen, setSaveToastOpen] = useState(false);

  const addToCollection = useMutation({
    mutationFn: (gameId: number) => {
      return addGameToCollection(gameId);
    },
    onMutate: () => {
      console.log("about to mutate");
    },
    onSuccess: (newCollection) => {
      console.log("nice, I did a mutation");
      console.log(newCollection);

      // this is where we can handle updating state, and revalidating collection
      // fetches on the server. Should consider if I can revalidate anything on the
      // next side as well..
      queryClient.setQueryData(["collection", "ids", userId], newCollection.gameId);

      setSaveToastOpen(true);
    },
  });

  const handleSaveClicked = () => {
    addToCollection.mutate(game.id);
  };

  const handleRemoveClicked = async () => {
    await handleRemoveFromCollection(game.id);
  };

  const handleToastUndoClicked = async () => {
    setSaveToastOpen(false);
    await handleRemoveFromCollection(game.id);
  };

  return (
    <>
      <div>
        {game.isInCollectionOrSaving === false && (
          <Button
            className="absolute bottom-4 right-4"
            variant={"default"}
            onClick={handleSaveClicked}
          >
            save
          </Button>
        )}
        {game.isInCollectionOrSaving === "saving" && (
          <Button className="absolute bottom-4 right-4" variant={"ghost"}>
            saving..
          </Button>
        )}
        {game.isInCollectionOrSaving === "removing" && (
          <Button className="absolute bottom-4 right-4" variant={"ghost"}>
            removing..
          </Button>
        )}
        {game.isInCollectionOrSaving === true && (
          <Button
            className="absolute bottom-4 right-4"
            variant={"destructive"}
            onClick={handleRemoveClicked}
          >
            remove
          </Button>
        )}
      </div>

      <Toast open={saveToastOpen} onOpenChange={setSaveToastOpen} variant={"default"}>
        <ToastClose />
        <ToastTitle>{`${game.name} saved to your collection`}</ToastTitle>
        <ToastDescription>
          <div className="flex flex-row gap-x-3">
            <Button variant={"outline"} asChild>
              <Link href={"/collection"}>Collection</Link>
            </Button>
            <Button variant={"destructive"} onClick={handleToastUndoClicked}>
              Undo
            </Button>
          </div>
        </ToastDescription>
      </Toast>
    </>
  );
}
