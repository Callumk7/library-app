import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { DotsIcon } from "@/components/ui/icons/DotsIcon";
import { SortOption } from "@/types";
import { GenreDropdownCheckboxItem } from "./genre-dropdown";
import CollectionSearch from "./search";
import { Add } from "../ui/icons/Add";
import { Playlist } from "@prisma/client";
import { CollectionMenubar } from "./collection-menubar";

interface CollectionControlBarProps {
  genres: string[];
  playlists: Playlist[];
  genreFilter: string[];
  searchTerm: string;
  sortOption: SortOption;
  isPlayedFilterActive: boolean;
  setSortOption: (option: SortOption) => void;
  handleSearchTermChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlayedFilterClicked: () => void;
  handleGenreToggled: (genre: string) => void;
  handleToggleAllGenres: () => void;
  handleBulkAddToPlaylist: (playlistId: number) => Promise<void>;
}

export default function CollectionControlBar({
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
}: CollectionControlBarProps) {
  const handleAddToPlaylistClicked = async (e: React.MouseEvent<HTMLDivElement>) => {
    const playlistId = Number(e.currentTarget.id);
    await handleBulkAddToPlaylist(playlistId);
  };
  return (
    <div>
      <div className="flex flex-row space-x-6">
        <CollectionSearch
          handleSearchTermChanged={handleSearchTermChanged}
          searchTerm={searchTerm}
        />
        <Button
          variant={"outline"}
          onClick={
            sortOption === "nameAsc"
              ? () => setSortOption("nameDesc")
              : sortOption === "nameDesc"
              ? () => setSortOption("rating")
              : () => setSortOption("nameAsc")
          }
        >
          {sortOption === "nameAsc"
            ? "asc"
            : sortOption === "nameDesc"
            ? "desc"
            : "rating"}
        </Button>
        <Button
          variant={isPlayedFilterActive ? "default" : "outline"}
          onClick={handlePlayedFilterClicked}
        >
          played
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} className="flex flex-row gap-3">
              genres
              <DotsIcon className="ml-auto h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            {genres.map((genre, index) => (
              <GenreDropdownCheckboxItem
                key={index}
                genre={genre}
                genreFilter={genreFilter}
                handleGenreToggled={handleGenreToggled}
              />
            ))}
            <DropdownMenuItem asChild>
              <Button size={"sm"} className="m-4" onClick={handleToggleAllGenres}>
                toggle all
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex flex-row gap-3">
              Add to playlist
              <Add />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {playlists.map((playlist, index) => (
              <DropdownMenuItem
                id={String(playlist.id)}
                key={index}
                onClick={handleAddToPlaylistClicked}
              >
                {playlist.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
