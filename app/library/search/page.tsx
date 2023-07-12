import GameSearchBar from "@/components/game-search";
import LibraryView from "@/components/library/library-view";

async function getSearchResults(q: string) {
  const res = await fetch(process.env.IGDB_URL!, {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID!,
      Authorization: `Bearer ${process.env.IGDB_BEARER_TOKEN!}`,
      "content-type": "text/plain",
    },
    body: `search "${q}"; fields name, cover.url, genres.*; limit 20;`,
    cache: "no-store",
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

  return (
    <div>
      <GameSearchBar />
      <LibraryView content={content} />
    </div>
  );
}
