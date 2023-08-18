"use client";

import { Button } from "@/components/ui/button";
import { Add } from "@/components/ui/icons/Add";
import { PlaylistWithGames } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { AddPlaylistDialog } from "./AddPlaylistDialog";
import { useState } from "react";
import { fetchUserPlaylists } from "../queries/query-functions";

interface PlaylistSidebarProps {
  userId: string;
  playlists: PlaylistWithGames[];
}

export function PlaylistSidebar({ playlists, userId }: PlaylistSidebarProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const playlistQuery = useQuery({
    queryKey: ["playlists", userId],
    queryFn: () => fetchUserPlaylists(userId),
    initialData: playlists,
  });

  return (
    <>
      <div className="flex w-[15vw] min-w-[168px] flex-col space-y-1 rounded-lg border px-2 py-1">
        <Button className="mx-2 my-4" onClick={() => setDialogOpen(true)}>
          <Add />
        </Button>
        {playlistQuery.data.map((playlist, index) => (
          <Button
            className="justify-start self-start p-2 text-start"
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
      <AddPlaylistDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  );
}
