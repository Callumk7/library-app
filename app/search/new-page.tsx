import { searchGames } from "@/lib/db/games/queries";
import { ClientSearchContainer } from "@/components/search/ClientSearchContainer";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;
  console.log(query);

  const results = await searchGames(query);

  if (results.length === 0) {
    // search and process IGDB
  }
 
  return (
    <div className="mt-10">
      <ClientSearchContainer results={results} />
    </div>
  );
}
