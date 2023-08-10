import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover";
import { DeleteIcon } from "@/components/ui/icons/DeleteIcon";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import { Playlist } from "@prisma/client";

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
    <div className="m-2 rounded-md border px-2 py-2">
      <div className="flex flex-row items-center justify-between">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant={isPlayed ? "default" : "outline"}
              size={"sm"}
              onClick={handlePlayedClicked}
            >
              {isPlayed ? "played" : "not played"}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>Toggle played</HoverCardContent>
        </HoverCard>
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
                  variant={"link"}
                  onClick={handleSaveToPlaylistClicked}
                >{`Add to ${playlist.name}`}</Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <HoverCard>
          <HoverCardTrigger>
            <Button variant={"linkMono"} size={"icon"} onClick={handleRemoveClicked}>
              <DeleteIcon />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>Delete game from collection</HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <Button
              variant={isCompleted ? "default" : "outline"}
              size={"sm"}
              onClick={handleCompletedClicked}
            >
              {isCompleted ? "completed" : "unfinished"}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>Mark game as completed!</HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
