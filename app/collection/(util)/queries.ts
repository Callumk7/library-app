import { prisma } from "@/lib/prisma/client";

export async function getRecentGames(count: number) {
	const getGames = await prisma.userGameCollection.findMany({
		take: count,
		orderBy: {
			createdAt: "desc",
		},
		select: {
			game: {
				select: {
					cover: true,
					title: true,
				},
			},
		},
	});
	return getGames;
}

export async function getUserGenres(userId: string) {
  console.time("get user genres");
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
  console.timeEnd("get user genres");
  return findUserGenres;
}


export async function getCollection(userId: string) {
  console.time("get collection");
  const userCollection = await prisma.userGameCollection.findMany({
    where: {
      userId,
    },
    include: {
      game: {
        include: {
          cover: true,
          genres: true,
          artworks: true,
          screenshots: true,
        },
      },
    },
  });

  console.timeEnd("get collection");
  return userCollection;
}

