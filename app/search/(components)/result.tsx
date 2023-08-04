import { GameSearchResult, IGDBImage } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { SearchToast } from "./toast";
import { Button } from "@/components/ui/button";

interface SearchResultProps {
  game: GameSearchResult;
  handleSave: (gameId: number) => Promise<void>;
  handleRemove: (gameId: number) => Promise<void>;
}

export function SearchResult({ game, handleSave, handleRemove }: SearchResultProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [saveToastOpen, setSaveToastOpen] = useState(false);
  const [removeToastOpen, setRemoveToastOpen] = useState(false);

  const handleSaveClicked = async () => {
    await handleSave(game.id);
    setSaveToastOpen(true);
  };

  const handleRemoveClicked = async () => {
    await handleRemove(game.id);
    setRemoveToastOpen(true);
  };

  // image size fetched from IGDB
  const size: IGDBImage = "screenshot_med";

  // TODO: cleanup svg into icon
  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-lg border text-foreground animate-in hover:border-foreground">
      {isImageLoaded ? null : (
        <div className="h-[320px] w-[569px]">
          <svg
            className="absolute left-1/2 top-1/2 animate-spin"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="M5.1 16c-.3-.5-.9-.6-1.4-.4c-.5.3-.6.9-.4 1.4c.3.5.9.6 1.4.4c.5-.3.6-.9.4-1.4zm-.4-9.4c-.5-.2-1.1-.1-1.4.4c-.2.5-.1 1.1.4 1.4c.5.2 1.1.1 1.4-.4c.2-.5.1-1.1-.4-1.4zm15.6 1.8c.5-.3.6-.9.4-1.4c-.3-.5-.9-.6-1.4-.4c-.5.3-.6.9-.4 1.4c.3.5.9.6 1.4.4zM4 12c0-.6-.4-1-1-1s-1 .4-1 1s.4 1 1 1s1-.4 1-1zm3.2 6.8c-.5.1-.9.7-.7 1.2c.1.5.7.9 1.2.7c.5-.1.9-.7.7-1.2c-.1-.5-.6-.8-1.2-.7zM21 11c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1zm-.7 4.6c-.5-.3-1.1-.1-1.4.4c-.3.5-.1 1.1.4 1.4c.5.3 1.1.1 1.4-.4c.2-.5.1-1.1-.4-1.4zM17 3.3c-.5-.3-1.1-.1-1.4.4c-.3.5-.1 1.1.4 1.4c.5.3 1.1.1 1.4-.4c.2-.5.1-1.1-.4-1.4zm-.2 15.5c-.5-.1-1.1.2-1.2.7c-.1.5.2 1.1.7 1.2c.5.1 1.1-.2 1.2-.7c.1-.5-.2-1-.7-1.2zM12 20c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1zm0-18c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1z"
            />
          </svg>
        </div>
      )}
      <Image
        onLoad={() => setIsImageLoaded(true)}
        src={`https://images.igdb.com/igdb/image/upload/t_${size}/${game.artworks[0].image_id}.jpg`}
        alt="cover image"
        width={569}
        height={320}
      />
      <div className="p-2">
        <h1 className="mb-1 font-bold">{game.name}</h1>
        {game.genres && <p className="text-sm opacity-70">{game.genres[0].name}</p>}
      </div>
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

      <SearchToast
        title={`${game.name} added`}
        content="Find it in your collection, go now?"
        toastOpen={saveToastOpen}
        setToastOpen={setSaveToastOpen}
      ></SearchToast>
    </div>
  );
}
