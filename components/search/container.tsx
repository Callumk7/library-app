import { IGDBGame } from "@/types";
import { SearchResults } from "./search-results";
import { getSearchResults } from "./util/search-helpers";
import { getCollectionGameIds } from "@/util/collection";
import { prisma } from "@/lib/prisma/client";

export default async function SearchContainer({
  query,
  userId,
}: {
  query: string;
  userId: string | null;
}) {
  let results: IGDBGame[] = [];
  let collection: number[] = [];
  if (userId) {
    const [data, ids] = await Promise.all([
      getSearchResults(query),
      getCollectionGameIds(userId),
    ]);
    results = data;
    collection = ids;
  } else {
    const data = await getSearchResults(query);
    results = data;
  }

  return (
    <div className="">
      <SearchResults results={results} collectionIds={collection} />
      <GameUploader results={results} />
    </div>
  );
}

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

async function GameUploader({ results }: { results: IGDBGame[] }) {
  // upsert results to the database..
  processSearchResults(results).then(
    (results) => console.log("completed process")
  );
  return <div></div>
}
