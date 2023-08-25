"use client";

import { Button } from "@/components/ui/button";
import { GameWithCoverGenresUsers } from "@/types";
import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast";
import { useEffect, useState } from "react";
import { useAddToCollectionMutation, useDeleteMutation } from "@/features/collection/queries/mutations";
import { useCollectionGameIdsQuery } from "@/lib/hooks/queries";

interface SearchResultEntryControlsProps {
  userId: string;
  game: GameWithCoverGenresUsers;
}

export function SearchResultEntryControls({
  userId,
  game,
}: SearchResultEntryControlsProps) {
  const [saveToastOpen, setSaveToastOpen] = useState<boolean>(false);

  const collectionIds = useCollectionGameIdsQuery(userId);
  const addToCollection = useAddToCollectionMutation(userId);
  const deleteEntry = useDeleteMutation(userId);

  return (
    <>
      <div className="w-full px-2 py-1">
        {collectionIds.data?.includes(game.gameId) ? (
          <Button
            variant={deleteEntry.isLoading ? "ghost" : "destructive"}
            onClick={() =>
              deleteEntry.mutate(game.gameId)
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
