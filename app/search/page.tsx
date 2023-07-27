import { SearchResults } from "@/components/search/search-results";
import { auth } from "@clerk/nextjs";
import { getCollectionExternalIds, getSearchResults } from "./search-helpers";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { userId } = auth();

  // parallel fetching!
  const [data, ids] = await Promise.all([
    getSearchResults(searchParams.q),
    getCollectionExternalIds(userId!),
  ]);

  let tracker = 0;
  for (const game of data) {
    if (ids.includes(game.id)) {
      console.log(`${game.id}: MATCHED`);
      tracker += 1;
    }
  }
  if (tracker === 0) {
    console.log("No match");
  }

  if (data.length === 0) {
    return <h1 className="text-xl text-white">No results found</h1>;
  } else {
    return (
      <div className="animate-in mx-auto w-10/12">
        <SearchResults results={data} collectionIds={ids} />
      </div>
    );
  }
}
