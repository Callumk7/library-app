import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { DotsIcon } from "@/components/ui/icons/DotsIcon";
import { PlaylistWithGames, SortOption } from "@/types";
import Link from "next/link";
import { GenreDropdownCheckboxItem } from "./genre-dropdown";
import CollectionSearch from "./search";

interface CollectionControlBarProps {
  genres: string[];
  genreFilter: string[];
  searchTerm: string;
  sortOption: SortOption;
  isPlayedFilterActive: boolean;
  setSortOption: (option: SortOption) => void;
  handleSearchTermChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePlayedFilterClicked: () => void;
  handleGenreToggled: (genre: string) => void;
  handleToggleAllGenres: () => void;
  playlists: PlaylistWithGames[];
}

export default function CollectionControlBar({
  genres,
  genreFilter,
  searchTerm,
  sortOption,
  setSortOption,
  handleSearchTermChanged,
  isPlayedFilterActive,
  handlePlayedFilterClicked,
  handleGenreToggled,
  handleToggleAllGenres,
  playlists,
}: CollectionControlBarProps) {
  return (
    <div>
      <div className="flex flex-row space-x-6">
        <Button asChild>
          <Link href="/collection/playlists/">Playlists</Link>
        </Button>
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
            <Button className="flex flex-row gap-3">
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
      </div>
    </div>
  );
}
