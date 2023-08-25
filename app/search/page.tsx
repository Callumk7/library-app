import {
  getCollectionGameIds,
  getFullCollection,
} from "@/features/collection/queries/prisma-functions";
import { ClientSearchContainer } from "@/features/search/components/ClientSearchContainer";
import { ExternalResultsContainer } from "@/features/search/components/ExternalResultsContainer";
import {
  searchGames,
  searchGamesWithUsers,
} from "@/features/search/queries/prisma-functions";
import { IGDBGame, IGDBGameSchema } from "@/types";
import { getSearchResults } from "@/util/igdb";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  const query = searchParams.q;
  console.log(query);

  const [results, igdbResults, resultsWithUsers, collection, collectionIds] =
    await Promise.all([
      searchGames(query),
      getSearchResults(query),
      searchGamesWithUsers(query),
      getFullCollection(userId),
      getCollectionGameIds(userId),
    ]);

  const externalResults: IGDBGame[] = [];
  for (const result of igdbResults) {
    const validResult = IGDBGameSchema.parse(result);
    externalResults.push(validResult);
  }

  return (
    <div className="mt-10 grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <ClientSearchContainer
          results={results}
          resultsWithUsers={resultsWithUsers}
          userId={userId}
          collection={collection}
          collectionIds={collectionIds}
        />
      </div>
      <ExternalResultsContainer results={externalResults} />
    </div>
  );
}
