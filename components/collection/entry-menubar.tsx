import { CollectionWithGamesGenresPlaylists } from "@/types";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Playlist } from "@prisma/client";
import { Button } from "../ui/button";

interface EntryMenubarProps {
  entry: CollectionWithGamesGenresPlaylists;
  playlists: Playlist[];
  handleEntryPlayedToggled: (gameId: number) => Promise<void>;
  handleEntryCompletedToggled: (gameId: number) => Promise<void>;
  handleGameAddedToPlaylist: (playlistId: number, gameId: number) => Promise<void>;
}

export function EntryMenubar({
  entry,
  playlists,
  handleEntryPlayedToggled,
  handleEntryCompletedToggled,
  handleGameAddedToPlaylist,
}: EntryMenubarProps) {
  // requirements:
  // 1. View playlists that the game is part of
  // 2. Add and remove from playlists
  // 3. Remove from collection
  // 4. mark as unplayed, played or completed
  // 5. Provide user score
  // 6. Add personal tags (later...)
  // 7. Add notes (later...)
  // 8. Add personal genres (later...)

  return (
    <Menubar className="mb-2 border-none">
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
          {playlists.map((playlist, index) => {
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
    </Menubar>
  );
}
