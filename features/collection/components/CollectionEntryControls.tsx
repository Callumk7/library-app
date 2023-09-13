import { GameWithCoverAndGenres } from "@/types";
import { DeleteIcon } from "@/components/ui/icons/DeleteIcon";
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
import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast";
import { useAddGameToPlaylist } from "@/features/playlists/hooks/mutations";
import {
  useGamePlaylistsQuery,
  usePlaylistQuery,
} from "@/features/playlists/hooks/queries";
import { useDeleteMutation, useTogglePlayed } from "../hooks/mutations";
import { HeartOutline } from "@/components/ui/icons/HeartOutline";
import { Add } from "@/components/ui/icons/Add";
import { Checkbox } from "@/components/ui/checkbox";
import { useCollectionEntryQuery } from "../hooks/queries";
import { Spinner } from "@/components/ui/icons/Spinner";
import { HeartFull } from "@/components/ui/icons/HeartFull";

interface CollectionEntryControlsProps {
  userId: string;
  game: GameWithCoverAndGenres;
  selectedGames: number[];
  handleSelectedToggled: (gameId: number) => void;
}

export function CollectionEntryControls({
  userId,
  game,
  selectedGames,
  handleSelectedToggled,
}: CollectionEntryControlsProps) {
  const [playlistArray, setPlaylistArray] = useState<number[]>([]);
  const [saveToastOpen, setSaveToastOpen] = useState<boolean>(false);
  const [deleteGameToastOpen, setDeleteGameToastOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(() =>
    selectedGames.some((gameId) => gameId !== game.gameId)
  );

  const gamePlaylistsQuery = useGamePlaylistsQuery(userId, game.gameId);
  const userPlaylistsQuery = usePlaylistQuery(userId);
  const collectionEntryQuery = useCollectionEntryQuery(userId, game.gameId);

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
    setIsSelected(selectedGames.some((gameId) => gameId === game.gameId));
  }, [selectedGames, game]);

  const deleteEntry = useDeleteMutation(userId);
  const addToPlaylist = useAddGameToPlaylist(userId);
  const playedToggled = useTogglePlayed(userId);

  return (
    <div className="flex w-fit flex-row items-center justify-end gap-2 border p-1 rounded-md">
      <Button variant={"ghost"} size={"icon"}>
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => {
            setIsSelected(!isSelected);
            handleSelectedToggled(game.gameId);
          }}
        />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => playedToggled.mutate(game.gameId)}
      >
        {collectionEntryQuery.isLoading ? (
          <Spinner className="animate-spin" />
        ) : collectionEntryQuery.data?.played ? <HeartFull className="text-primary" /> : <HeartOutline />
        }
      </Button>
      <Button variant={"ghost"} size={"icon"}>
        <Add />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
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
            checked={isSelected}
            onCheckedChange={() => {
              handleSelectedToggled(game.gameId);
              setIsSelected(!isSelected);
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
                        { playlistId: playlist.id, gameId: game.gameId, userId: userId },
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
    </div>
  );
}
