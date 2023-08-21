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
      <div className="inset-3 flex h-fit w-1/4 min-w-[256px] flex-col gap-4 rounded-lg border">
        <Button onClick={() => setDialogOpen(true)} className="mx-4 my-6">
          <span className="mr-1">Add Playlist</span> <Add />
        </Button>
        {playlistQuery.data.map((playlist, index) => (
          <Button
            className="mb-4 justify-start self-start text-start"
            key={index}
            variant={"link"}
            asChild
          >
            <Link href={`/collection/${userId}/playlists/${playlist.id}`}>
              {playlist.name}
            </Link>
          </Button>
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
