import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useState } from "react";
import { Input } from "@/components/ui/form";
import { AddPlaylistDialog } from "@/features/playlists/components/AddPlaylistDialog";
import { useBulkAddGameToPlaylist } from "@/features/playlists/hooks/mutations";
import { usePlaylistQuery } from "@/features/playlists/hooks/queries";
import { useDeleteManyMutation } from "../hooks/mutations";
import { Toggle } from "@/components/ui/toggle";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import { PlaylistWithGames } from "@/types";

interface CollectionViewMenubarProps {
  userId: string;
  selectedGames: number[];
  searchTerm: string;
  handleSelectAll: () => void;
  handleUnselectAll: () => void;
  handleSearchTermChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  viewIsCard: boolean;
  handleToggleView: () => void;
  playlists: PlaylistWithGames[];
}

export function GameViewMenubar({
  userId,
  selectedGames,
  searchTerm,
  handleSelectAll,
  handleUnselectAll,
  handleSearchTermChanged,
  viewIsCard,
  handleToggleView,
  playlists
}: CollectionViewMenubarProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const playlistQuery = usePlaylistQuery(userId);

  const deleteMany = useDeleteManyMutation(userId);
  const addManyToPlaylist = useBulkAddGameToPlaylist(userId);

  return (
    <div className="flex flex-row space-x-6 self-start">
      <Input
        value={searchTerm}
        name="search"
        onChange={handleSearchTermChanged}
        placeholder="Search for a game"
      />
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Actions</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={() => deleteMany.mutate(selectedGames)}
              className="focus-visible:bg-destructive/80"
            >
              Delete selected
            </MenubarItem>
            <MenubarItem
              onClick={selectedGames.length > 0 ? handleUnselectAll : handleSelectAll}
            >
              {selectedGames.length > 0 ? "Deselect all" : "Select all"}
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Add to Playlist</MenubarSubTrigger>
              <MenubarSubContent>
                {playlistQuery.data &&
                  playlistQuery.data.map((playlist, index) => (
                    <MenubarItem
                      id={String(playlist.id)}
                      key={index}
                      onClick={() =>
                        addManyToPlaylist.mutate({
                          playlistId: playlist.id,
                          gameIds: selectedGames,
                        })
                      }
                    >
                      {playlist.name}
                    </MenubarItem>
                  ))}
                <MenubarSeparator />
                <MenubarItem onClick={() => setDialogOpen(true)}>
                  Create Playlist..
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Toggle
        pressed={!viewIsCard}
        variant={"outline"}
        onPressedChange={handleToggleView}
        aria-label="view"
      >
        <MenuIcon />
      </Toggle>
      <AddPlaylistDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        userId={userId}
      />
    </div>
  );
}
