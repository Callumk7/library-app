import CollectionSearch from "./collection-search";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { SortOption } from "@/types";

interface CollectionControlBarProps {
  genres: string[];
  handleSearchTermChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  isPlayedFilterActive: boolean;
  handlePlayedFilterClicked: () => void;
}

export default function CollectionControlBar({
  genres,
  searchTerm,
  sortOption,
  setSortOption,
  handleSearchTermChanged,
  isPlayedFilterActive,
  handlePlayedFilterClicked,
}: CollectionControlBarProps) {
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
              : () => setSortOption("nameAsc")
          }
        >
          {sortOption === "nameAsc" ? "asc" : "desc"}
        </Button>
        <Button
          variant={isPlayedFilterActive ? "default" : "outline"}
          onClick={handlePlayedFilterClicked}
        >
          played
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isPlayedFilterActive ? "default" : "outline"}
              onClick={handlePlayedFilterClicked}
            >
              genres
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent className="flex flex-col bg-background">
              {genres.map((genre) => (
                <DropdownMenuItem key={genre} asChild>
                  <Button variant={"link"} size={"sm"}>
                    {genre}
                  </Button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
    </div>
  );
}
