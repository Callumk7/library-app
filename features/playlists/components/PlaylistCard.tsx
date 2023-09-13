import { IGDBImage, PlaylistWithGamesAndCover } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface PlaylistCardProps {
  playlist: PlaylistWithGamesAndCover;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const size: IGDBImage = "cover_big";
  return (
    <Link
      href={`/collection/${playlist.userId}/playlists/${playlist.id}`}
      className="w-full rounded-md bg-midnight-5"
    >
      <div className="relative bottom-10 left-5 grid w-[136px] grid-cols-2 overflow-hidden rounded-md shadow-md">
        {playlist.games.slice(0, 4).map((game, index) => (
          <Link
            key={index}
            href={`/collection/${playlist.userId}/playlists/${playlist.id}`}
          >
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_${size}/${game.game.cover?.imageId}.jpg`}
              alt={game.game.title}
              width={68}
              height={96}
            />
          </Link>
        ))}
      </div>
      <h1 className="px-3 py-2 font-poppins font-semibold">{playlist.name}</h1>
    </Link>
  );
}
