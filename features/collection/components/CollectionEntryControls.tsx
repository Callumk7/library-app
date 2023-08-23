import { CollectionWithGamesGenresPlaylists } from "@/types";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Playlist } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { DeleteIcon } from "@/components/ui/icons/DeleteIcon";
import { useDeleteMutation, useTogglePlayed } from "../queries/mutations";
import { useAddGameToPlaylist } from "@/features/playlists/queries/mutations";
import { useEffect, useState } from "react";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { fetchUserPlaylists } from "@/features/playlists/queries";
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";

interface CollectionEntryControlsProps {
  userId: string;
  entry: CollectionWithGamesGenresPlaylists;
  playlists: Playlist[];
  checkedGames: number[];
  handleCheckedToggled: (gameId: number) => void;
  handleEntryCompletedToggled: (gameId: number) => Promise<void>;
}

export function CollectionEntryControls({
  userId,
  entry,
  playlists,
  checkedGames,
  handleCheckedToggled,
  handleEntryCompletedToggled,
}: CollectionEntryControlsProps) {
  const [playlistArray, setPlaylistArray] = useState<number[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(() =>
    checkedGames.some((game) => game !== entry.gameId)
  );

  const playlistsQuery = useQuery({
    queryKey: ["playlists", userId],
    queryFn: () => fetchUserPlaylists(userId),
    initialData: playlists,
  });

  useEffect(() => {
    const initCheckedArray = [];
    for (const playlist of playlistsQuery.data) {
      if (entry.game.playlists.some((pl) => pl.playlistId === playlist.id)) {
        initCheckedArray.push(playlist.id);
      }
    }

    setPlaylistArray(initCheckedArray);
  }, [entry.game.playlists, playlistsQuery.data]);

  // Effect for ensuring that the controls instantly reflect that games are selected
  // when a user does a mass toggle
  useEffect(() => {
    setIsChecked(checkedGames.some((game) => game === entry.gameId));
  }, [checkedGames, entry.gameId]);

  const deleteEntry = useDeleteMutation(userId);
  const addToPlaylist = useAddGameToPlaylist(userId);
  const playedToggled = useTogglePlayed(userId);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="absolute right-2 top-2">
          <Button variant={"muted"} size={"icon"}>
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Manage Game</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="focus-visible:bg-destructive/80"
            onClick={() => deleteEntry.mutate(entry.gameId)}
          >
            <DeleteIcon className="mr-2 h-4 w-4" />
            <span>Delete from collection</span>
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem
            checked={isChecked}
            onCheckedChange={() => {
              handleCheckedToggled(entry.gameId);
              setIsChecked(!isChecked);
            }}
          >
            Select game..
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Played</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={entry.played}
            onCheckedChange={() => playedToggled.mutate(entry.gameId)}
          >
            Played game
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Completed game</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Menubar className="mx-1 mb-2">
        <MenubarMenu>
          <MenubarTrigger>Status</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem
              checked={entry.played}
              onCheckedChange={() => playedToggled.mutate(entry.gameId)}
            >
              Played
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={entry.completed}
              onCheckedChange={() => handleEntryCompletedToggled(entry.gameId)}
            >
              Completed
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Playlists</MenubarTrigger>
          <MenubarContent>
            {playlistsQuery.data.map((playlist, index) => {
              return (
                <MenubarCheckboxItem
                  key={index}
                  checked={playlistArray.some((playlistId) => playlistId === playlist.id)}
                  onCheckedChange={() =>
                    addToPlaylist.mutate(
                      { playlistId: playlist.id, gameId: entry.gameId },
                      {
                        onSuccess: (data, variables) =>
                          setPlaylistArray([...playlistArray, variables.playlistId]),
                      }
                    )
                  }
                >
                  {playlist.name}
                </MenubarCheckboxItem>
              );
            })}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
}
