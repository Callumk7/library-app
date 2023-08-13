import { GameSearchResult, IGDBImage } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface SearchResultProps {
  game: GameSearchResult;
  children: React.ReactNode;
}

export function GameCardArtwork({ game, children }: SearchResultProps) {
  // image size fetched from IGDB
  const size: IGDBImage = "screenshot_med";

  return (
    <div className="relative flex max-h-28 w-full flex-row overflow-hidden rounded-lg border text-foreground animate-in hover:border-foreground">
      <Link href={`/games/${game.id}`}>
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_${size}/${game.artworks[0].image_id}.jpg`}
          alt="cover image"
          width={203}
          height={114}
        />
      </Link>
      <div className="p-2">
        <h1 className="mb-1 font-bold">{game.name}</h1>
        {game.genres && <p className="text-sm opacity-70">{game.genres[0].name}</p>}
        <p>{game.aggregated_rating ? game.aggregated_rating : "no rating"}</p>
      </div>
      {children}
    </div>
  );
}
