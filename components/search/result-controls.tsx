import { GameSearchResult } from "@/types";
import { Button } from "../ui/button";
import { useState } from "react";
import { Toast, ToastClose, ToastDescription, ToastTitle } from "../ui/toast";
import Link from "next/link";

interface SearchResultControlsProps {
  game: GameSearchResult;
  handleSaveToCollection: (gameId: number) => Promise<void>;
  handleRemoveFromCollection: (gameId: number) => Promise<void>;
}

export function SearchResultControls({
  game,
  handleSaveToCollection,
  handleRemoveFromCollection,
}: SearchResultControlsProps) {
  const [saveToastOpen, setSaveToastOpen] = useState(false);

  const handleSaveClicked = async () => {
    await handleSaveToCollection(game.id);
    setSaveToastOpen(true);
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
