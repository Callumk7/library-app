"use client";

import { useCollectionQuery } from "@/features/collection/hooks/queries";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/form";
import { useEffect, useMemo, useState } from "react";
import { GameListEntry } from "./games/GameListEntry";
import { Add } from "./ui/icons/Add";

interface SearchPopoverProps {
  userId: string;
}

export function SearchPopover({ userId }: SearchPopoverProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const collectionQuery = useCollectionQuery(userId);

  const filteredCollection = useMemo(() => {
    if (collectionQuery.isSuccess) {
      let output = [...collectionQuery.data!];
      if (searchTerm !== "") {
        output = output.filter((entry) =>
          entry.game.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return output;
    }
  }, [collectionQuery.data, collectionQuery.isSuccess, searchTerm]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setIsPopoverOpen(false);
    }
  }, [searchTerm.length]);

  return (
    <Popover open={isPopoverOpen}>
      <PopoverTrigger>
        <Input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsPopoverOpen(true);
          }}
        />
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onFocusOutside={() => setIsPopoverOpen(false)}
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
        onInteractOutside={() => setIsPopoverOpen(false)}
      >
        {collectionQuery.isLoading && <div>collection loading...</div>}
        {collectionQuery.isError && <div>something went wrong..</div>}
        {collectionQuery.isSuccess &&
          filteredCollection!.map((game) => (
            <GameListEntry game={game.game} key={game.gameId}>
              <Button>
                <Add />
              </Button>
            </GameListEntry>
          ))}
      </PopoverContent>
    </Popover>
  );
}
