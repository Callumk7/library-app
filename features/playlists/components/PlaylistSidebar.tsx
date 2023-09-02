"use client";

import { Button } from "@/components/ui/button";
import { Add } from "@/components/ui/icons/Add";
import { DeleteIcon } from "@/components/ui/icons/DeleteIcon";
import { PlaylistWithGames } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { AddPlaylistDialog } from "./AddPlaylistDialog";
import { useDeletePlaylist } from "../hooks/mutations";
import { usePlaylistQuery } from "../hooks/queries";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

interface PlaylistSidebarProps {
  userId: string;
  playlists: PlaylistWithGames[];
}

export function PlaylistSidebar({ userId, playlists }: PlaylistSidebarProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const playlistQuery = usePlaylistQuery(userId, playlists);

  return (
    <>
      <div className="mb-5 flex h-full justify-self-start min-h-[80vh] w-1/4 min-w-[256px] flex-col gap-2 rounded-lg border animate-in">
        <SidebarMenu />
        <Button
          onClick={() => setDialogOpen(true)}
          className="mx-4 my-6"
          variant={"secondary"}
        >
          <span className="mr-1">Add Playlist</span> <Add />
        </Button>
        {playlistQuery.data &&
          playlistQuery.data.map((playlist, index) => (
            <PlaylistEntry key={index} playlist={playlist} userId={userId} />
          ))}
      </div>
      <AddPlaylistDialog
        userId={userId}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
}

interface PlaylistEntryProps {
  playlist: PlaylistWithGames;
  userId: string;
}

function PlaylistEntry({ playlist, userId }: PlaylistEntryProps) {
  const deletePlaylist = useDeletePlaylist(userId);
  // sidebar entry
  return (
    <Link
      href={`/collection/${userId}/playlists/${playlist.id}`}
      className="relative m-1 mb-2 flex flex-col place-items-start justify-start rounded-md p-1 hover:bg-background-90"
    >
      <div className="px-2 py-1 text-sm font-medium text-foreground">{playlist.name}</div>
      <div className="inset-3 flex flex-row space-x-4">
        <p className="px-2 text-xs  text-foreground/60">Author Name</p>
        <p className=" text-xs  text-foreground/60">
          {playlist.games ? playlist.games.length : 0}
        </p>
      </div>
      <Button
        onClick={() => deletePlaylist.mutate(playlist.id)}
        className="absolute right-2 top-2"
        size={"icon"}
        variant={"outline"}
      >
        <DeleteIcon />
      </Button>
    </Link>
  );
}

function SidebarMenu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Sort</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Filter</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>New</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
