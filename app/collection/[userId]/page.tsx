import { auth } from "@clerk/nextjs";
import { CollectionContainer } from "@/components/collection/container";
import { getUserGenres } from "@/lib/db/genres/queries";
import { getCollection } from "@/lib/db/collection/queries";
import { getPlaylists } from "@/lib/db/playlists/queries";

export default async function CollectionPage({ params }: { params: { userId: string } }) {
  const { userId } = auth();
  if (userId !== params.userId) {
    return <h1>NOT YOU, GET OUT</h1>;
  }

  const [getGenres, collection, playlists] = await Promise.all([
    getUserGenres(userId),
    getCollection(userId),
    getPlaylists(userId),
  ]);

  const genres = getGenres.map((g) => g.name);
  return (
    <main className="flex min-h-screen flex-col items-center space-y-10 p-24 animate-in">
      <CollectionContainer
        userId={userId}
        collection={collection}
        genres={genres}
        playlists={playlists}
      />
    </main>
  );
}
