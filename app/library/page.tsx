import fs from "fs";
import LibraryView from "@/components/library/library-view";
import path from "path";

async function getGames() {
  const res = await fetch(process.env.IGDB_URL!, {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID!,
      Authorization: `Bearer ${process.env.IGDB_BEARER_TOKEN!}`,
      "content-type": "text/plain",
    },
    body: 'search "Halo"; fields name, cover.url, genres.*; limit 20;',
    cache: "no-store",
  });
  return res.json();
}

export default async function GamesPage() {
  const data = await getGames();
  const content = await Promise.all(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-lg font-bold text-lime-300">This is the games page</h1>
      <LibraryView content={content} />
    </main>
  );
}
