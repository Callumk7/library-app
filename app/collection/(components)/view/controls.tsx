import { Checkbox } from "@/components/ui/checkbox";
import CollectionSearch from "./search";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { DotsIcon } from "@/components/ui/icons/DotsIcon";
import { SortOption } from "@/types";
import Link from "next/link";
import { GenreDropdownCheckboxItem } from "./genre-dropdown";

interface CollectionControlBarProps {
  genres: string[];
  genreFilter: string[];
  handleSearchTermChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  isPlayedFilterActive: boolean;
  handlePlayedFilterClicked: () => void;
  handleGenreToggled: (genre: string) => void;
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
          <DropdownMenuPortal>
            <DropdownMenuContent className="flex flex-col bg-background">
              {genres.map((genre, index) => (
                <GenreDropdownCheckboxItem
                  key={index}
                  genre={genre}
                  genreFilter={genreFilter}
                  handleGenreToggled={handleGenreToggled}
                />
              ))}
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
    </div>
  );
}
