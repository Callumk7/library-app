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
import { useDeleteMutation } from "../queries/mutations";
import { fetchUserPlaylists } from "@/features/playlists/queries/query-functions";
import { useAddGameToPlaylist } from "@/features/playlists/queries/mutations";
import { useEffect, useState } from "react";

interface CollectionEntryControlsProps {
  userId: string;
  entry: CollectionWithGamesGenresPlaylists;
  playlists: Playlist[];
  handleEntryPlayedToggled: (gameId: number) => Promise<void>;
  handleEntryCompletedToggled: (gameId: number) => Promise<void>;
}

export function CollectionEntryControls({
  userId,
  entry,
  playlists,
  handleEntryPlayedToggled,
  handleEntryCompletedToggled,
}: CollectionEntryControlsProps) {
  const [isCheckedArray, setIsCheckedArray] = useState<number[]>([]);

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

    setIsCheckedArray(initCheckedArray);
  }, [entry.game.playlists, playlistsQuery.data]);

  const deleteEntry = useDeleteMutation(userId);
  const addToPlaylist = useAddGameToPlaylist(userId);

  return (
    <Menubar className="mx-1 mb-2">
      <MenubarMenu>
        <MenubarTrigger>Status</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem
            checked={entry.played}
            onCheckedChange={() => handleEntryPlayedToggled(entry.gameId)}
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
                checked={isCheckedArray.some((playlistId) => playlistId === playlist.id)}
                onCheckedChange={() =>
                  addToPlaylist.mutate(
                    { playlistId: playlist.id, gameId: entry.gameId },
                    {
                      onSuccess: (data, variables) =>
                        setIsCheckedArray([...isCheckedArray, variables.playlistId]),
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
      <MenubarMenu>
        <MenubarTrigger onClick={() => deleteEntry.mutate(entry.gameId)}>
          <DeleteIcon />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
