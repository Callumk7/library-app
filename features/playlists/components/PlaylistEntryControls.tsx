import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { DeleteIcon } from "@/components/ui/icons/DeleteIcon";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import { GameWithCoverAndGenres } from "@/types";
import { useState } from "react";
import { useDeleteGameFromPlaylist } from "../hooks/mutations";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PlaylistEntryControlsProps {
  userId: string;
  playlistId: number;
  game: GameWithCoverAndGenres;
  handleCheckedToggled: (gameId: number) => void;
}

export function PlaylistEntryControls({
  userId,
  playlistId,
  game,
  handleCheckedToggled,
}: PlaylistEntryControlsProps) {
  const [isChecked, setIsChecked] = useState<boolean>();
  const deleteFromPlaylist = useDeleteGameFromPlaylist(userId);

  return (
    <>
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
      <div className="px-4 flex space-x-3 self-start py-4">
        <Switch
          id="played"
          checked={isChecked}
          onCheckedChange={() => {
            handleCheckedToggled(game.gameId);
            setIsChecked(!isChecked);
          }}
        />
        <Label htmlFor="played">{isChecked ? "played" : "not played"}</Label>
      </div>
    </>
  );
}
