"use client";

import { Button } from "@/components/ui/button";
import { Add } from "@/components/ui/icons/Add";
import { SearchIcon } from "@/components/ui/icons/Search";
import { useSaveGame } from "@/features/collection/hooks/mutations";
import { IGDBGame } from "@/types";

interface ExternalSearchResultControlsProps {
  game: IGDBGame;
}

export function ExternalSearchResultControls({
  game,
}: ExternalSearchResultControlsProps) {
  const saveGame = useSaveGame(game);

  return (
    <Button onClick={() => saveGame.mutate()} variant={"secondary"} size={"xs"}>
      {saveGame.isLoading ? (
      <SearchIcon />
        ) : (
        <Add />
        )
      }
    </Button>
  );
}
