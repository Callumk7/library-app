import { CollectionView } from "@/components/collection/collection-view";
import { prisma } from "@/lib/prisma/client";
import { auth } from "@clerk/nextjs";

export const revalidate = 1;

async function getGames(userId: string) {
  const userCollection = await prisma.userGameCollection.findMany({
    where: {
      clerkId: userId!,
    },
    select: {
      gameId: true,
    },
  });

  const gameIdArray = userCollection.map((user) => user.gameId);

  const games = await prisma.game.findMany({
    where: {
      externalId: {
        in: gameIdArray,
      },
    },
    include: {
      cover: true,
      UserGameCollection: {
        where: {
          clerkId: userId,
        },
      },
    },
  });
  return games;
}

export default async function CollectionPage() {
  const { userId } = auth();
  if (!userId) {
    return <h1>User not found</h1>;
  }
  const games = await getGames(userId);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CollectionView content={games} />
    </main>
  );
}
