import { options } from "@/app/api/auth/[...nextauth]/options";
import { ClientSearchContainer } from "@/features/search/components/ClientSearchContainer";
import { ExternalResultsContainer } from "@/features/search/components/ExternalResultsContainer";
import { searchGamesWithUsers } from "@/features/search/hooks/queries";
import { getSearchResults } from "@/util/igdb";
import { getServerSession } from "next-auth";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  let query = searchParams.q;
  if (!searchParams.q) {
    query = "hollow";
  }
  const session = await getServerSession(options);
  if (!session) {
    return <div>time to login</div>;
  }
  if (session) {
    const userId = session.user.id;
    const [igdbResults, resultsWithUsers] = await Promise.all([
      getSearchResults(query),
      searchGamesWithUsers(query),
    ]);

    return (
      <div className="mx-4 mt-10 flex flex-col space-y-5">
        <ClientSearchContainer userId={userId} resultsWithUsers={resultsWithUsers} />
        <ExternalResultsContainer results={igdbResults} />
      </div>
    );
  }
}
