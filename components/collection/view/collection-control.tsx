import { Checkbox } from "@/components/ui/checkbox";
import CollectionSearch from "./collection-search";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { DotsIcon } from "@/components/ui/icons/DotsIcon";
import { SortOption } from "@/types";
import Link from "next/link";

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
            <Button className="flex flex-row gap-3">
              genres
              <DotsIcon className="ml-auto h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent className="flex flex-col bg-background">
              {genres.map((genre) => (
                <DropdownMenuItem key={genre} asChild>
                  <Button variant={"link"} size={"sm"}>
                    <div className="flex flex-row justify-between w-full px-1">
                      {genre}
                      <Checkbox />
                    </div>
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
