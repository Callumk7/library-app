import {
  CollectionWithGamesGenresPlaylists,
  GameWithCoverAndGenres,
  GameWithCoverGenresPlaylists,
} from "@/types";
import { DeleteIcon } from "@/components/ui/icons/DeleteIcon";
import { useDeleteMutation, useTogglePlayed } from "../queries/mutations";
import { useAddGameToPlaylist } from "@/features/playlists/queries/mutations";
import { useEffect, useState } from "react";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { usePlaylistQuery, useGamePlaylistsQuery } from "@/lib/hooks/queries";
import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast";

interface CollectionEntryControlsProps {
  userId: string;
  game: GameWithCoverAndGenres;
  checkedGames: number[];
  handleCheckedToggled: (gameId: number) => void;
}

export function CollectionEntryControls({
  userId,
  game,
  checkedGames,
  handleCheckedToggled,
}: CollectionEntryControlsProps) {
  const [playlistArray, setPlaylistArray] = useState<number[]>([]);
  const [saveToastOpen, setSaveToastOpen] = useState<boolean>(false);
  const [deleteGameToastOpen, setDeleteGameToastOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(() =>
    checkedGames.some((gameId) => gameId !== game.gameId)
  );

  const gamePlaylistsQuery = useGamePlaylistsQuery(userId, game.gameId);
  const userPlaylistsQuery = usePlaylistQuery(userId);

  useEffect(() => {
    const initCheckedArray = [];
    for (const playlist of userPlaylistsQuery.data!) {
      if (gamePlaylistsQuery.data) {
        if (gamePlaylistsQuery.data.some((pl) => pl.id === playlist.id)) {
          initCheckedArray.push(playlist.id);
        }
      }
    }

    setPlaylistArray(initCheckedArray);
  }, [userPlaylistsQuery.data, gamePlaylistsQuery.data]);

  // Effect for ensuring that the controls instantly reflect that games are selected
  // when a user does a mass toggle
  useEffect(() => {
    setIsChecked(checkedGames.some((gameId) => gameId === game.gameId));
  }, [checkedGames, game]);

  const deleteEntry = useDeleteMutation(userId);
  const addToPlaylist = useAddGameToPlaylist(userId);
  const playedToggled = useTogglePlayed(userId);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="absolute right-2 top-2">
          <Button variant={"muted"} size={"icon"}>
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Manage Game</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="focus:bg-destructive/80"
            onClick={() =>
              deleteEntry.mutate(game.gameId, {
                onSuccess: () => setDeleteGameToastOpen(true),
              })
            }
          >
            <DeleteIcon className="mr-2 h-4 w-4" />
            <span>Delete from collection</span>
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem
            checked={isChecked}
            onCheckedChange={() => {
              handleCheckedToggled(game.gameId);
              setIsChecked(!isChecked);
            }}
          >
            Select game..
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Playlists</DropdownMenuLabel>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Add to Playlist</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {userPlaylistsQuery.data!.map((playlist, index) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={index}
                    checked={playlistArray.some(
                      (playlistId) => playlistId === playlist.id
                    )}
                    onCheckedChange={() =>
                      addToPlaylist.mutate(
                        { playlistId: playlist.id, gameId: game.gameId },
                        {
                          onSuccess: (data, variables) => {
                            setPlaylistArray([...playlistArray, variables.playlistId]);
                            setSaveToastOpen(true);
                          },
                        }
                      )
                    }
                  >
                    {playlist.name}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      <Toast open={saveToastOpen} onOpenChange={setSaveToastOpen} variant={"default"}>
        <ToastTitle>{game.title} added to collection</ToastTitle>
        <ToastDescription>Well done lad</ToastDescription>
        <ToastClose />
      </Toast>
      <Toast
        open={deleteGameToastOpen}
        onOpenChange={setDeleteGameToastOpen}
        variant={"destructive"}
      >
        <ToastTitle>{game.title} removed from collection!</ToastTitle>
        <ToastDescription>Bold move sucker</ToastDescription>
        <ToastClose />
      </Toast>
    </>
  );
}
