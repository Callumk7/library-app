import GameSearchBar from "@/components/game-search";
import { LibraryView } from "@/components/library/library-view";
import { IGDBGame } from "@/types";

async function getSearchResults(q: string): Promise<IGDBGame[]> {
  const res = await fetch(process.env.IGDB_URL!, {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID!,
      Authorization: `Bearer ${process.env.IGDB_BEARER_TOKEN!}`,
      "content-type": "text/plain",
    },
    body: `search "${q}"; fields name, cover.image_id, genres.*; limit 20;`,
  });
  return res.json();
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const data = await getSearchResults(searchParams.q);
  const content = await Promise.all(data);

  if (content.length === 0) {
    return <h1 className="text-xl text-white">No results found</h1>;
  } else {
    return (
      <div className="animate-in">
        <LibraryView content={content} />
      </div>
    );
  }
}
