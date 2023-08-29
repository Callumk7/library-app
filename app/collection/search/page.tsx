import { ClientSearchContainer } from "@/features/search/components/ClientSearchContainer";
import { ExternalResultsContainer } from "@/features/search/components/ExternalResultsContainer";
import { searchGamesWithUsers } from "@/features/search/hooks/queries";
import { getSearchResults } from "@/util/igdb";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  const query = searchParams.q;
  console.log(query);

  const [igdbResults, resultsWithUsers] = await Promise.all([
    getSearchResults(query),
    searchGamesWithUsers(query),
  ]);

  return (
    <div className="mx-4 mt-10 grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <ClientSearchContainer userId={userId} resultsWithUsers={resultsWithUsers} />
      </div>
      <ExternalResultsContainer results={igdbResults} />
    </div>
  );
}
