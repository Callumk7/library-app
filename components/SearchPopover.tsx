"use client";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/form";
import { useEffect, useMemo, useState } from "react";
import { GameListEntry } from "./games/GameListEntry";
import { useDbSearchQuery } from "@/features/search/hooks/queries";
import { SearchResultEntryControls } from "@/features/search/components/SearchResultEntryControls";
import { Button } from "./ui/button";
import { Add } from "./ui/icons/Add";
import { useAddGameToPlaylist } from "@/features/playlists/hooks/mutations";

interface SearchPopoverProps {
  userId: string;
  playlistId: number;
}

export function SearchPopover({ userId, playlistId }: SearchPopoverProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const dbQuery = useDbSearchQuery(searchTerm);
  const addToPlaylist = useAddGameToPlaylist(userId);

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
          onClick={() => setIsPopoverOpen(true)}
        />
      </PopoverTrigger>
      <PopoverContent
        className="w-[40vw]"
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
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() =>
                  addToPlaylist.mutate({ playlistId: playlistId, gameId: game.gameId })
                }
              >
                <Add />
              </Button>
            </GameListEntry>
          ))}
      </PopoverContent>
    </Popover>
  );
}
