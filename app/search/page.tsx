import { IGDBGame, IGDBGameSchema } from "@/types";
import { auth } from "@clerk/nextjs";
import { SearchContainer } from "@/components/search/container";
import { getSearchResults } from "@/util/igdb";
import { getCollectionGameIds } from "@/lib/prisma/collection/queries";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;
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
      // validate search result data shape, as we have no control over
      // this external API
      for (const result of searchResultsJson as unknown[]) {
        results.push(IGDBGameSchema.parse(result));
      }
    } catch (err) {
      // TODO: handle the user experience for reporting errors in external data,
      console.error("an error occurred during search data validation", err);
    }
  } else {
    // no user, so no collection to fetch
    const searchResultsJson = await getSearchResults(query);
    try {
      for (const result of searchResultsJson as unknown[]) {
        results.push(IGDBGameSchema.parse(result));
      }
    } catch (err) {
      console.error("an error occurred", err);
    }
  }

  // send games to be processed with the long running service
  const questHandlerRes = await fetch(`${process.env.QUEST_HANDLER_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  });
  console.log(`sent search results to quest handler, status: ${questHandlerRes.status}`);

  return (
    <div className="mt-10">
      <SearchContainer results={results} collectionIds={collectionIds} />
    </div>
  );
}
