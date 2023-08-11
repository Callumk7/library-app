import { Playlist } from "@prisma/client";
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
} from "../ui/menubar";
import { SortOption } from "@/types";
import CollectionSearch from "./search";

interface CollectionMenubarProps {
  genres: string[];
  playlists: Playlist[];
  genreFilter: string[];
  searchTerm: string;
  isPlayedFilterActive: boolean;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  handleSearchTermChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlayedFilterClicked: () => void;
  handleGenreToggled: (genre: string) => void;
  handleToggleAllGenres: () => void;
  handleBulkAddToPlaylist: (playlistId: number) => Promise<void>;
}

export function CollectionMenubar({
  genres,
  playlists,
  genreFilter,
  searchTerm,
  sortOption,
  setSortOption,
  handleSearchTermChanged,
  isPlayedFilterActive,
  handlePlayedFilterClicked,
  handleGenreToggled,
  handleToggleAllGenres,
  handleBulkAddToPlaylist,
}: CollectionMenubarProps) {
  return (
    <div className="flex flex-row space-x-6">
      <CollectionSearch
        handleSearchTermChanged={handleSearchTermChanged}
        searchTerm={searchTerm}
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
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Filter</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem
              checked={isPlayedFilterActive}
              onCheckedChange={handlePlayedFilterClicked}
            >
              Played
            </MenubarCheckboxItem>
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
            <MenubarItem>Select all</MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger>Add to Playlist</MenubarSubTrigger>
              <MenubarSubContent>
                {playlists.map((playlist, index) => (
                  <MenubarItem
                    id={String(playlist.id)}
                    key={index}
                    onClick={() => handleBulkAddToPlaylist(playlist.id)}
                  >
                    {playlist.name}
                  </MenubarItem>
                ))}
                <MenubarSeparator />
                <MenubarItem>Create Playlist..</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
