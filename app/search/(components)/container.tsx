import { IGDBGame, IGDBGameSchema } from "@/types";
import { SearchResults } from "./results";
import { getCollectionGameIds } from "@/util/collection";
import { prisma } from "@/lib/prisma/client";
import { auth } from "@clerk/nextjs";
import { getSearchResults } from "../(util)/queries";

export async function SearchContainer({ query }: { query: string }) {
  const { userId } = auth();

  const results: IGDBGame[] = [];
  let collectionIds: number[] = [];

  if (userId) {
    const [searchResultsJson, getIds] = await Promise.all([
      getSearchResults(query),
      getCollectionGameIds(userId),
    ]);

    collectionIds = getIds;
    try {
      for (const result of searchResultsJson as unknown[]) {
        results.push(IGDBGameSchema.parse(result));
      }
    } catch (err) {
      console.error("an error occurred", err);
    }
  } else {
    const searchResultsJson = await getSearchResults(query);
    try {
      for (const result of searchResultsJson as unknown[]) {
        results.push(IGDBGameSchema.parse(result));
      }
    } catch (err) {
      console.error("an error occurred", err);
    }
  }

  // handle this response
  const response = await fetch("http://localhost:3100/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  });
  console.log(response.status);

  return (
    <div className="">
      <SearchResults results={results} collectionIds={collectionIds} />
    </div>
  );
}

// TODO: Move this to a dedicated handler function
async function processSearchResults(results: IGDBGame[]) {
  let processedGameCount = 0;
  if (results) {
    const upsertGamePromises = [];
    for (const game of results) {
      const upsertGamePromise = prisma.game.upsert({
        where: {
          gameId: game.id,
        },
        update: {},
        create: {
          gameId: game.id,
          title: game.name,
          cover: {
            create: {
              imageId: game.cover.image_id,
            },
          },
        },
        select: {
          gameId: true,
        },
      });
      processedGameCount += 1;
      upsertGamePromises.push(upsertGamePromise);
      console.log(`promise primed for ${game.name}`);
    }
    const processedGames = await Promise.all(upsertGamePromises);
    processedGames.forEach((game) => console.log(game));
    return processedGames;
  }
  return null;
}
