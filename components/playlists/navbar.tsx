import { auth } from "@clerk/nextjs";
import { Playlist } from "@prisma/client";
import Link from "next/link";

interface PlaylistNavBarProps {
  playlists: Playlist[];
}

export function PlaylistNavBar({ playlists }: PlaylistNavBarProps) {
  const { userId } = auth();
  return (
    <div className="w-full rounded-md border px-8 py-4">
      <ul className="flex flex-row space-x-5">
        {playlists.map((playlist, index) => (
          <li key={index}>
            <Link href={`/collection/${userId}/playlists/${playlist.id}`}>
              {playlist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
