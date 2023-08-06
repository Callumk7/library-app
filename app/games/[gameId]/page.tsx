import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { getGameDetails } from "../(util)/igdb";
import { IGDBGame, IGDBGameSchema } from "@/types";

export default async function GamePage({ params }: { params: { gameId: string } }) {
  const gameId = Number(params.gameId);

  let validExternalData: Partial<IGDBGame> = {}; 
  try {
    const externalData = await getGameDetails(gameId);
    validExternalData = IGDBGameSchema.parse(externalData[0]);
    console.log(validExternalData);
  } catch (err) {
    console.error("error fetching external data:", err);
  }

  const game = await prisma.game.findUnique({
    where: {
      gameId,
    },
    include: {
      cover: true,
      genres: {
        include: {
          genre: true,
        },
      },
      artworks: true,
      screenshots: true,
    },
  });

  const artworks = await prisma.artwork.findMany({
    where: {
      gameId,
    },
  });

  const screenshots = await prisma.screenshot.findMany({
    where: {
      gameId,
    },
  });

  console.log(artworks.length);
  console.log(screenshots.length);

  if (!game) {
    return <div>No game found</div>;
  }

  const size = "1080p";

  return (
    <div className="mx-auto mt-5 w-4/5">
      <div className="grid grid-cols-2 gap-6">
        <div className="">
          <div className="overflow-hidden rounded-md">
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_${size}/${
                game.cover!.imageId
              }.jpg`}
              alt="cover image"
              width={1080}
              height={1920}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-md border p-3">
            <div className="self-start pb-3 text-3xl font-black">
              {game.title.toUpperCase()}
            </div>
            <div>{game.storyline}</div>
          </div>
          <div className="rounded-md border p-3">
            <h2 className="text-xl font-bold">Genres</h2>
            {game.genres.map((genre, index) => (
              <Button variant={"link"} asChild key={index}>
                <Link href={"/"}>{genre.genre.name}</Link>
              </Button>
            ))}
          </div>
          <div className="rounded-md border p-3">
            <div className="grid grid-cols-3 gap-1">
              {artworks.map((artwork, index) => (
                <Image
                  key={index}
                  src={`https://images.igdb.com/igdb/image/upload/t_${size}/${artwork.imageId}.jpg`}
                  alt={`${game.title} screenshot`}
                  width={128}
                  height={128}
                ></Image>
              ))}
              {screenshots.map((screenshot, index) => (
                <Image
                  key={index}
                  src={`https://images.igdb.com/igdb/image/upload/t_${size}/${screenshot.imageId}.jpg`}
                  alt={`${game.title} screenshot`}
                  width={128}
                  height={128}
                ></Image>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
