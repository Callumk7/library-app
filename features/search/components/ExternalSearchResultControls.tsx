"use client";

import { Button } from "@/components/ui/button";
import { IGDBGame } from "@/types";

interface ExternalSearchResultControlsProps {
  gameId: number;
  game: IGDBGame;
}

export function ExternalSearchResultControls({
  gameId,
  game,
}: ExternalSearchResultControlsProps) {
  const handleSave = async () => {
    const res = await fetch("/api/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
  };

  return (
    <div>
      <Button onClick={handleSave} variant={"destructive"}>
        Save to database
      </Button>
    </div>
  );
}
