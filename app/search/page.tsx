import { SearchResults } from "@/components/search/search-results";
import { prisma } from "@/lib/prisma/client";
import { IGDBGame } from "@/types";
import { auth } from "@clerk/nextjs";

async function getSearchResults(q: string): Promise<IGDBGame[]> {
  const res = await fetch(process.env.IGDB_URL!, {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID!,
      Authorization: `Bearer ${process.env.IGDB_BEARER_TOKEN!}`,
      "content-type": "text/plain",
    },
    body: `search "${q}"; fields name, artworks.image_id, screenshots.image_id, aggregated_rating, aggregated_rating_count, cover.image_id, storyline, genres.name; limit 40; where artworks != null;`,
    cache: "force-cache",
  });
  console.log("IGDB fetch completed");
  return res.json();
}

async function getCollectionExternalIds(userId: string): Promise<number[]> {
  const findCollection = await prisma.userGameCollection.findMany({
    where: {
      clerkId: userId,
    },
    select: {
      gameId: true,
    },
  });

  const results = [];
  for (const result of findCollection) {
    results.push(result.gameId);
  }
  console.log("get collection completed");
  console.log(results);
  return results;
}

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
