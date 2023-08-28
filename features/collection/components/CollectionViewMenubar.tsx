import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { SortOption } from "@/types";
import { useState } from "react";
import { Input } from "@/components/ui/form";
import { AddPlaylistDialog } from "@/features/playlists/components/AddPlaylistDialog";
import { useBulkAddGameToPlaylist } from "@/features/playlists/hooks/mutations";
import { usePlaylistQuery } from "@/features/playlists/hooks/queries";
import { useDeleteManyMutation } from "../hooks/mutations";
import { Toggle } from "@/components/ui/toggle";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";

interface CollectionViewMenubarProps {
  userId: string;
  checkedGames: number[];
  genres: string[];
  genreFilter: string[];
  searchTerm: string;
  sortOption: SortOption;
  handleCheckAll: () => void;
  handleUncheckAll: () => void;
  setSortOption: (option: SortOption) => void;
  handleSearchTermChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenreToggled: (genre: string) => void;
  handleToggleAllGenres: () => void;
  viewIsCard: boolean;
  handleToggleView: () => void;
}

export function CollectionViewMenubar({
  userId,
  checkedGames,
  genres,
  genreFilter,
  searchTerm,
  handleCheckAll,
  handleUncheckAll,
  sortOption,
  setSortOption,
  handleSearchTermChanged,
  handleGenreToggled,
  handleToggleAllGenres,
  viewIsCard,
  handleToggleView
}: CollectionViewMenubarProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const playlistQuery = usePlaylistQuery(userId);

  const deleteMany = useDeleteManyMutation(userId);
  const addManyToPlaylist = useBulkAddGameToPlaylist(userId);

  return (
    <div className="flex flex-row space-x-6">
      <Input
        value={searchTerm}
        name="search"
        onChange={handleSearchTermChanged}
        placeholder="Search for a game"
      />
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Sort</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={sortOption}>
              <MenubarRadioItem
                onSelect={() => setSortOption("nameAsc")}
                value={"nameAsc"}
              >
                Name ascending
              </MenubarRadioItem>
              <MenubarRadioItem
                onSelect={() => setSortOption("nameDesc")}
                value={"nameDesc"}
              >
                Name descending
              </MenubarRadioItem>
              <MenubarRadioItem onSelect={() => setSortOption("rating")} value={"rating"}>
                Rating
              </MenubarRadioItem>
              <MenubarRadioItem onSelect={() => setSortOption("releaseDateAsc")} value={"releaseDateAsc"}>
                Release Date (asc)
              </MenubarRadioItem>
              <MenubarRadioItem onSelect={() => setSortOption("releaseDateDesc")} value={"releaseDateDesc"}>
                Release Date (desc)
              </MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Filter</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger inset>Genres</MenubarSubTrigger>
              <MenubarSubContent>
                {genres.map((genre, index) => (
                  <MenubarCheckboxItem
                    key={index}
                    checked={genreFilter.includes(genre)}
                    onCheckedChange={() => handleGenreToggled(genre)}
                  >
                    {genre}
                  </MenubarCheckboxItem>
                ))}
                <MenubarSeparator />
                <MenubarItem inset onClick={handleToggleAllGenres}>
                  Toggle all
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Actions</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={() => deleteMany.mutate(checkedGames)}
              className="focus-visible:bg-destructive/80"
            >
              Delete selected
            </MenubarItem>
            <MenubarItem
              onClick={checkedGames.length > 0 ? handleUncheckAll : handleCheckAll}
            >
              {checkedGames.length > 0 ? "Deselect all" : "Select all"}
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Add to Playlist</MenubarSubTrigger>
              <MenubarSubContent>
                {playlistQuery.data && playlistQuery.data.map((playlist, index) => (
                  <MenubarItem
                    id={String(playlist.id)}
                    key={index}
                    onClick={() =>
                      addManyToPlaylist.mutate({
                        playlistId: playlist.id,
                        gameIds: checkedGames,
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
      <Toggle pressed={viewIsCard} onPressedChange={handleToggleView} aria-label="view">
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
