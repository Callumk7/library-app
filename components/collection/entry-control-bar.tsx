import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { DeleteIcon } from "@/components/ui/icons/DeleteIcon";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import { Playlist } from "@prisma/client";
import { CircleFill } from "../ui/icons/CircleFill";
import { CircleProgress } from "../ui/icons/CircleProgress";
import { PlayFill } from "../ui/icons/PlayFill";
import { PlayOutline } from "../ui/icons/PlayOutline";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface CardToolbarProps {
  gameId: number;
  isPlayed: boolean;
  isCompleted: boolean;
  playlists: Playlist[];

  handleGameAddedToPlaylist: (playlistId: number, gameId: number) => Promise<void>;
  handleEntryPlayedToggled: (gameId: number) => Promise<void>;
  handleEntryCompletedToggled: (gameId: number) => Promise<void>;
  handleRemoveEntry: (gameId: number) => Promise<void>;
}

export function EntryControlBar({
  gameId,
  isPlayed,
  isCompleted,
  handleRemoveEntry,
  handleEntryPlayedToggled,
  handleEntryCompletedToggled,
  handleGameAddedToPlaylist,
  playlists,
}: CardToolbarProps) {
  const handlePlayedClicked = async () => {
    await handleEntryPlayedToggled(gameId);
  };

  const handleRemoveClicked = async () => {
    await handleRemoveEntry(gameId);
  };

  const handleCompletedClicked = async () => {
    await handleEntryCompletedToggled(gameId);
  };

  const handleSaveToPlaylistClicked = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const playlistId = e.currentTarget.name;
    await handleGameAddedToPlaylist(Number(playlistId), gameId);
  };

  return (
    <div className="m-2 px-2 py-2">
      <div className="flex flex-row items-center justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"linkMono"} size={"icon"} onClick={handlePlayedClicked}>
              {isPlayed ? <PlayFill /> : <PlayOutline />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle played</TooltipContent>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"linkMono"} size={"icon"}>
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-2">
            {playlists.map((playlist, index) => (
              <DropdownMenuItem key={index} asChild>
                <Button
                  name={String(playlist.id)}
                  variant={"linkMono"}
                  onClick={handleSaveToPlaylistClicked}
                >{`Add to ${playlist.name}`}</Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"linkMono"} size={"icon"} onClick={handleRemoveClicked}>
              <DeleteIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete game from collection</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"linkMono"} size={"sm"} onClick={handleCompletedClicked}>
              {isCompleted ? <CircleFill /> : <CircleProgress />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mark game as completed!</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
