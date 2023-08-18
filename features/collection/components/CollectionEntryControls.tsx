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

interface CollectionEntryControlsProps {
  userId: string,
  entry: CollectionWithGamesGenresPlaylists;
  playlists: Playlist[];
  handleEntryPlayedToggled: (gameId: number) => Promise<void>;
  handleEntryCompletedToggled: (gameId: number) => Promise<void>;
  handleGameAddedToPlaylist: (playlistId: number, gameId: number) => Promise<void>;
}

export function CollectionEntryControls({
  userId,
  entry,
  playlists,
  handleEntryPlayedToggled,
  handleEntryCompletedToggled,
  handleGameAddedToPlaylist,
}: CollectionEntryControlsProps) {

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["playlists", entry.userId],
    queryFn: () => fetchUserPlaylists(entry.userId),
    initialData: playlists,
  });

  const deleteEntry = useDeleteMutation(userId);

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
          {data.map((playlist, index) => {
            const isChecked = entry.game.playlists.some(
              (pl) => pl.playlist.id === playlist.id
            );
            return (
              <MenubarCheckboxItem
                key={index}
                checked={isChecked}
                onCheckedChange={() =>
                  handleGameAddedToPlaylist(playlist.id, entry.gameId)
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
