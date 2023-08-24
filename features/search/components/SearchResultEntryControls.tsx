"use client";

import { Button } from "@/components/ui/button";
import { GameWithCoverGenresUsers } from "@/types";
import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast";
import { useEffect, useState } from "react";
import { useAddToCollectionMutation, useDeleteMutation } from "@/features/collection/queries/mutations";

interface SearchResultEntryControlsProps {
  userId: string;
  game: GameWithCoverGenresUsers;
}

export function SearchResultEntryControls({
  userId,
  game,
}: SearchResultEntryControlsProps) {
  const [isInCollection, setIsInCollection] = useState<boolean>(false);
  const [saveToastOpen, setSaveToastOpen] = useState<boolean>(false);

  const addToCollection = useAddToCollectionMutation(userId);
  const deleteEntry = useDeleteMutation(userId);

  // Check to see if the game is already in the users collection
  // this could be problematic when we have a large userbase
  useEffect(() => {
    if (game.users.some((user) => user.userId === userId)) {
      setIsInCollection(true);
    }
  }, [game, userId]);

  return (
    <>
      <div className="w-full px-2 py-1">
        {isInCollection ? (
          <Button
            variant={deleteEntry.isLoading ? "ghost" : "destructive"}
            onClick={() =>
              deleteEntry.mutate(game.gameId, {
                onSuccess: () => {
                  setIsInCollection(false);
                },
              })
            }
          >
            {deleteEntry.isLoading ? "removing.." : "remove from collection"}
          </Button>
        ) : (
          <Button
            variant={addToCollection.isLoading ? "ghost" : "default"}
            onClick={() =>
              addToCollection.mutate(game.gameId, {
                onSuccess: () => {
                  setIsInCollection(true);
                  setSaveToastOpen(true);
                },
              })
            }
          >
            {addToCollection.isLoading ? "adding.." : "add to collection"}
          </Button>
        )}
      </div>
      <Toast
        open={saveToastOpen}
        onOpenChange={setSaveToastOpen}
        variant={"default"}
      >
        <ToastTitle>{game.title} added to collection</ToastTitle>
        <ToastDescription>Well done lad</ToastDescription>
        <ToastClose />
      </Toast>
    </>
  );
}
