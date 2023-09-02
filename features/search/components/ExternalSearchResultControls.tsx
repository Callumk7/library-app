"use client";

import { Button } from "@/components/ui/button";
import { Add } from "@/components/ui/icons/Add";
import { IGDBGame } from "@/types";

interface ExternalSearchResultControlsProps {
  game: IGDBGame;
}

export function ExternalSearchResultControls({
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
    <Button onClick={handleSave} variant={"secondary"} size={"xs"}>
      <Add />
    </Button>
  );
}
