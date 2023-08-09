import { IGDBImage, PlaylistWithGamesAndCover } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface PlaylistCardProps {
  playlist: PlaylistWithGamesAndCover;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const size: IGDBImage = "cover_small";
  return (
    <div className="grid grid-cols-3 overflow-hidden rounded-md border hover:border-foreground">
      {playlist.games.map((game, index) => (
        <Link key={index} href={`/collection/${playlist.userId}/playlists/${playlist.id}`}>
          <Image
            src={`https://images.igdb.com/igdb/image/upload/t_${size}/${game.game.cover?.imageId}.jpg`}
            alt={game.game.title}
            width={90}
            height={128}
          />
        </Link>
      ))}
    </div>
  );
}
