import GameSearchBar from "@/components/game-search";
import LibraryView from "@/components/library/library-view";
import prisma from "@/lib/prisma/client";
import { IGDBGame } from "@/types";

async function getSearchResults(q: string): Promise<IGDBGame[]> {
  console.time("getSearchResults");
  console.time("startSearchPage");
  const res = await fetch(process.env.IGDB_URL!, {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID!,
      Authorization: `Bearer ${process.env.IGDB_BEARER_TOKEN!}`,
      "content-type": "text/plain",
    },
    body:
      `search "${q}"; fields name, cover.image_id, genres.*, storyline; limit 20;`,
    cache: "no-store",
  });
  console.timeEnd("getSearchResults");
  return res.json();
}

async function createManyGames(
  uploads: { externalId: number; title: string }[],
) {
  console.time("createManyGames");
  const uploadGames = await prisma.game.createMany({
    data: uploads,
    skipDuplicates: true,
  });
  console.timeEnd("createManyGames");
  console.dir(uploadGames);
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  console.time("SearchPage");
  const data = await getSearchResults(searchParams.q);
  const content = await Promise.all(data);

  if (content.length === 0) {
    console.timeEnd("SearchPage");
    return (
      <>
        <h1 className="text-xl text-white">No results found</h1>
        <GameSearchBar />
      </>
    );
  } else {
    const uploads = [];
    for (const game of content) {
      uploads.push({
        externalId: game.id,
        title: game.name,
      });
      console.log(`game ${game.name} pushed to uploads array`);
    }

    console.timeLog("SearchPage", "Time taken to prepare uploads");
    createManyGames(uploads);
    console.timeLog("SearchPage", "Time taken to call createManyGames");
    console.timeEnd("SearchPage");
    console.timeEnd("startSearchPage");
    return (
      <div className="animate-in">
        <GameSearchBar />
        <LibraryView content={content} />
      </div>
    );
  }
}
