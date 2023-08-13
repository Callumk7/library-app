import { PlaylistWithGames } from "@/types";
import Link from "next/link";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs";

interface PlaylistSidebarProps {
  playlists: PlaylistWithGames[];
}

export function PlaylistSidebar({ playlists }: PlaylistSidebarProps) {
  const {userId} = auth();
  return (
    <div className="mx-10 w-full rounded-lg border">
      {playlists.map((playlist, index) => (
        <div className="flex justify-between px-8 py-12" key={index}>
          <Button variant={"link"} asChild>
            <Link href={`/collection/${userId}/playlists/${playlist.id}`}>{playlist.name}</Link>
          </Button>
          <span className="rounded-full bg-secondary px-2 py-1 text-sm text-background">
            {playlist.games.length}
          </span>
        </div>
      ))}
    </div>
  );
}
