"use client";

import { Button } from "@/components/ui/button";
import { Add } from "@/components/ui/icons/Add";
import { DeleteIcon } from "@/components/ui/icons/DeleteIcon";
import { usePlaylistQuery } from "@/lib/hooks/queries";
import { PlaylistWithGames } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { useDeletePlaylist } from "../queries/mutations";
import { AddPlaylistDialog } from "./AddPlaylistDialog";

interface PlaylistSidebarProps {
  userId: string;
  playlists: PlaylistWithGames[];
}

export function PlaylistSidebar({ userId, playlists }: PlaylistSidebarProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const playlistQuery =usePlaylistQuery(userId, playlists);
  const deletePlaylist = useDeletePlaylist(userId);

  return (
    <>
      <div className="inset-3 flex h-fit w-1/4 min-w-[256px] flex-col gap-2 rounded-lg border">
        <Button onClick={() => setDialogOpen(true)} className="mx-4 my-6">
          <span className="mr-1">Add Playlist</span> <Add />
        </Button>
        {playlistQuery.data && playlistQuery.data.map((playlist, index) => (
          <div
            className="relative m-1 mb-2 flex flex-col place-items-start bg-background-95 justify-start rounded-md border p-1"
            key={index}
          >
            <Button variant={"link"} size={"link"} asChild>
              <Link href={`/collection/${userId}/playlists/${playlist.id}`}>
                {playlist.name}
              </Link>
            </Button>
            <div className="inset-3 flex flex-row space-x-4">
              <p className="px-2 text-xs  text-foreground/60">Author Name</p>
              <p className=" text-xs  text-foreground/60">{playlist.games.length}</p>
            </div>
            <Button onClick={() => deletePlaylist.mutate(playlist.id)} className="absolute top-2 right-2" size={"icon"} variant={"outline"}>
              <DeleteIcon />
            </Button>
          </div>
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
