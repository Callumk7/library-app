import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { DeleteIcon } from "@/components/ui/icons/DeleteIcon";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import { useDeleteGameFromPlaylist } from "../queries/mutations";
import { GameWithCoverAndGenres } from "@/types";

interface PlaylistEntryControlsProps {
  userId: string;
  playlistId: number;
  game: GameWithCoverAndGenres;
}

export function PlaylistEntryControls({
  userId,
  playlistId,
  game,
}: PlaylistEntryControlsProps) {
  const deleteFromPlaylist = useDeleteGameFromPlaylist(userId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="absolute right-2 top-2">
        <Button variant={"muted"} size={"icon"}>
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="focus-visible:bg-destructive/80"
          onClick={() =>
            deleteFromPlaylist.mutate({ playlistId: playlistId, gameId: game.gameId })
          }
        >
          <DeleteIcon className="mr-2 h-4 w-4" />
          <span>Delete from playlist</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
