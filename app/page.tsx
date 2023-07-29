import { prisma } from "@/lib/prisma/client";
import { IGDBImage } from "@/types";
import Image from "next/image";

async function getRecentGames() {
  const getGames = await prisma.userGameCollection.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      game: {
        include: {
          cover: true,
        },
      },
    },
  });
  return getGames;
}

const size: IGDBImage = "cover_big";

export default async function Home() {
  const recentGames = await getRecentGames();
  return (
    <main className="mx-auto w-4/5">
      <h1 className="text-2xl font-bold">Recent Games</h1>
      <div className="flex flex-row justify-center space-x-1">
        {recentGames.map((gc, index) => (
          <Image
            key={index}
            alt={gc.game.title}
            src={`https://images.igdb.com/igdb/image/upload/t_${size}/${
              gc.game.cover!.imageId
            }.jpg`}
            width={264}
            height={374}
          ></Image>
        ))}
      </div>
    </main>
  );
}
