import { CollectionWithGamesGenresPlaylists } from "@/types";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Playlist } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getUserPlaylists } from "@/lib/db/playlists/fetches";
import { DeleteIcon } from "@/components/ui/icons/DeleteIcon";

interface CollectionEntryControlsProps {
  entry: CollectionWithGamesGenresPlaylists;
  playlists: Playlist[];
  handleEntryPlayedToggled: (gameId: number) => Promise<void>;
  handleEntryCompletedToggled: (gameId: number) => Promise<void>;
  handleGameAddedToPlaylist: (playlistId: number, gameId: number) => Promise<void>;
  handleRemoveEntry: (gameId: number) => void;
}

export function CollectionEntryControls({
  entry,
  playlists,
  handleEntryPlayedToggled,
  handleEntryCompletedToggled,
  handleGameAddedToPlaylist,
  handleRemoveEntry,
}: CollectionEntryControlsProps) {

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["playlists", entry.userId],
    queryFn: () => getUserPlaylists(entry.userId),
    initialData: playlists,
  });

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
        <MenubarTrigger onClick={() => handleRemoveEntry(entry.gameId)}>
          <DeleteIcon />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
