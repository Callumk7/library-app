"use client";

import { useCollectionQuery } from "@/features/collection/hooks/queries";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/form";
import { useEffect, useMemo, useState } from "react";
import { GameListEntry } from "./games/GameListEntry";
import { Add } from "./ui/icons/Add";
import { useDbSearchQuery } from "@/features/search/hooks/queries";
import { SearchResultEntryControls } from "@/features/search/components/SearchResultEntryControls";

interface SearchPopoverProps {
  userId: string;
}

export function SearchPopover({ userId }: SearchPopoverProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const dbQuery = useDbSearchQuery(searchTerm);

  const filteredCollection = useMemo(() => {
    if (dbQuery.isSuccess) {
      let output = [...dbQuery.data];
      if (searchTerm !== "") {
        output = output.filter((entry) =>
          entry.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return output;
    }
  }, [dbQuery.data, dbQuery.isSuccess, searchTerm]);

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
          placeholder="Search for games"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsPopoverOpen(true);
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-96"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onFocusOutside={() => setIsPopoverOpen(false)}
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
        onInteractOutside={() => setIsPopoverOpen(false)}
      >
        {dbQuery.isLoading && <div>loading...</div>}
        {dbQuery.isError && <div>something went wrong..</div>}
        {dbQuery.isSuccess &&
          filteredCollection!.map((game) => (
            <GameListEntry game={game} key={game.gameId}>
              <SearchResultEntryControls game={game} userId={userId} />
            </GameListEntry>
          ))}
      </PopoverContent>
    </Popover>
  );
}
