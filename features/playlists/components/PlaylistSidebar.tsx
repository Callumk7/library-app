"use client";

import { Button } from "@/components/ui/button";
import { Add } from "@/components/ui/icons/Add";
import { PlaylistWithGames } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { AddPlaylistDialog } from "./AddPlaylistDialog";
import { useState } from "react";
import { fetchUserPlaylists } from "../queries";

interface PlaylistSidebarProps {
  userId: string;
  playlists: PlaylistWithGames[];
}

export function PlaylistSidebar({ userId, playlists }: PlaylistSidebarProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const playlistQuery = useQuery({
    queryKey: ["playlists", userId],
    queryFn: () => fetchUserPlaylists(userId),
    initialData: playlists,
  });

  return (
    <>
      <div className="inset-3 flex h-fit w-1/4 min-w-[256px] flex-col gap-2 rounded-lg border">
        <Button onClick={() => setDialogOpen(true)} className="mx-4 my-6">
          <span className="mr-1">Add Playlist</span> <Add />
        </Button>
        {playlistQuery.data.map((playlist, index) => (
          <div
            className="m-1 mb-2 flex flex-col place-items-start bg-background-95 justify-start rounded-md border p-1"
            key={index}
          >
            <Button variant={"link"} size={"link"} asChild>
              <Link href={`/collection/${userId}/playlists/${playlist.id}`}>
                {playlist.name}
              </Link>
            </Button>
            <div className="inset-3 flex flex-row space-x-4">
              <p className="px-2 text-xs  text-foreground/60">Author Name</p>
              <p className=" text-xs  text-foreground/60">14</p>
            </div>
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
