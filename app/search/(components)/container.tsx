import { IGDBGame, IGDBGameSchema } from "@/types";
import { SearchResults } from "./results";
import { auth } from "@clerk/nextjs";
import { getCollectionGameIds, getSearchResults } from "../(util)/queries";

export async function SearchContainer({ query }: { query: string }) {
  const { userId } = auth();

  const results: IGDBGame[] = [];
  let collectionIds: number[] = [];

  // get collection ids in parallel to search results if we have a
  // user logged in, otherwise just get search results
  // TODO: handle errors in fetches
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
      // so I can fix it..
      console.error("an error occurred during search data validation", err);
    }
  } else {
    const searchResultsJson = await getSearchResults(query);
    try {
      // see comments above
      for (const result of searchResultsJson as unknown[]) {
        results.push(IGDBGameSchema.parse(result));
      }
    } catch (err) {
      // see comments above
      console.error("an error occurred", err);
    }
  }

  // TODO: env variables for service locations
  // send search results to quest handler for processing, without blocking
  // user from their own work
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
      <SearchResults results={results} collectionIds={collectionIds} />
    </div>
  );
}
