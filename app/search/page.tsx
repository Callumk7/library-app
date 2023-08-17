import { getFullCollection } from "@/features/collection/queries/prisma-functions";
import { ClientSearchContainer } from "@/features/search/components/ClientSearchContainer";
import { searchGames } from "@/features/search/queries/prisma-functions";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  const query = searchParams.q;
  console.log(query);

  const results = await searchGames(query);
  const collection = await getFullCollection(userId);

  if (results.length === 0) {
    // search and process IGDB
    // for now display no results
    return <div>No results to show</div>
  }

  return (
    <div className="mt-10">
      <ClientSearchContainer results={results} userId={userId} collection={collection} />
    </div>
  );
}
