import { LibraryView } from "@/components/library/library-view";
import prisma from "@/lib/prisma/client";
import { IGDBGame } from "@/types";
import { auth } from "@clerk/nextjs";

async function getGames() {
  const res = await fetch(process.env.IGDB_URL!, {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID!,
      Authorization: `Bearer ${process.env.IGDB_BEARER_TOKEN!}`,
      "content-type": "text/plain",
    },
    body: "fields name, cover.image_id, genres.*; limit 20; sort rating desc; where rating > 90;",
    cache: "no-store",
  });
  return res.json();
}

export default async function GamesPage() {
  const { userId } = auth();
  // const user = await prisma.user.findFirst({
  //   where: {
  //     clerkId: userId!,
  //   },
  //   select: {
  //     id: true,
  //   },
  // });
  // const userCollection = await prisma.userGameCollection.findMany({
  //   where: {
  //     userId: user!.id,
  //   },
  //   include: {
  //     game: true,
  //   },
  // });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
