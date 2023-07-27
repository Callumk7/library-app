import { IGDBGame } from "@/types";
import { SearchResults } from "./search-results";
import { getSearchResults } from "./util/search-helpers";
import { Suspense } from "react";
import { getCollectionExternalIds } from "@/util/collection";

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
      getCollectionExternalIds(userId),
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
    </div>
  );
}
