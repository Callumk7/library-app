import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma/client";
import Image from "next/image";

export default async function GamePage({ params }: { params: { gameId: string } }) {
  const gameId = Number(params.gameId);

  const game = await prisma.game.findUnique({
    where: {
      externalId: gameId,
    },
    include: {
      cover: true,
    },
  });

  const size = "1080p";

  return (
    <>
      <Button className="absolute left-20 top-20">Back</Button>
      <div className="grid grid-cols-5">
        <div className="col-span-3">
          <div className="m-4 max-w-md overflow-hidden rounded-md">
            <Image
              src={`https://images.igdb.com/igdb/image/upload/t_${size}/${
                game!.cover!.imageId
              }.jpg`}
              alt="cover image"
              width={1080}
              height={1920}
            />
            <div>{game!.title}</div>
          </div>
        </div>
        <div className="col-span-1 bg-red-800">
          <div className="flex flex-col space-y-10">
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </>
  );
}
