import { CollectionView } from "@/components/collection/view/collection-view";
import { prisma } from "@/lib/prisma/client";
import { CollectionWithGamesAndGenre } from "@/types";
import { auth } from "@clerk/nextjs";
import { Suspense } from "react";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

async function getUserGenres(userId: string) {
  const findUserGames = await prisma.userGameCollection.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
    select: {
      gameId: true,
    },
  });

  const gameIds = findUserGames.map((ug) => ug.gameId);

  const findUserGenres = await prisma.genre.findMany({
    where: {
      games: {
        some: {
          gameId: {
            in: gameIds,
          },
        },
      },
    },
    select: {
      name: true,
    },
  });
  return findUserGenres;
}

async function getCollection(userId: string) {
  const res = await fetch(`${process.env.APP_URL}/api/collection/`, {
    method: "GET",
    headers: {
      user: userId,
    },
    next: { revalidate: 0, tags: ["collection"] },
  });

  return res;
}

export default async function CollectionPage({ params }: { params: { userId: string } }) {
  const { userId } = auth();
  if (userId !== params.userId) {
    return <h1>NOT YOU, GET OUT</h1>;
  }

  const [getGenres, collection] = await Promise.all([
    getUserGenres(userId),
    getCollection(userId),
  ]);

  const genres = getGenres.map((g) => g.name);

  const data: CollectionWithGamesAndGenre[] = await collection.json();

  return (
    <main className="flex min-h-screen flex-col items-center space-y-10 p-24 animate-in">
      <Suspense>
        <CollectionView collection={data} genres={genres} />
      </Suspense>
    </main>
  );
}
