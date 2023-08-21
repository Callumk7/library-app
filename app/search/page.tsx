import {
  getCollectionGameIds,
  getFullCollection,
} from "@/features/collection/queries/prisma-functions";
import { ClientSearchContainer } from "@/features/search/components/ClientSearchContainer";
import { searchGames, searchGamesWithUsers } from "@/features/search/queries/prisma-functions";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  const query = searchParams.q;
  console.log(query);

  const results = await searchGames(query);
  const resultsWithUsers = await searchGamesWithUsers(query);
  const collection = await getFullCollection(userId);
  const collectionIds = await getCollectionGameIds(userId);

  if (results.length === 0) {
    // search and process IGDB
    // for now display no results
    return <div>No results to show</div>;
  }

  return (
    <div className="mt-10">
      <ClientSearchContainer
        results={results}
        resultsWithUsers={resultsWithUsers}
        userId={userId}
        collection={collection}
        collectionIds={collectionIds}
      />
    </div>
  );
}
