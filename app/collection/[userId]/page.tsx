import { getUserGenres } from "@/lib/db/genres/queries";
import { getFullCollection } from "@/features/collection/queries/prisma-functions";
import { getPlaylists } from "@/features/playlists/queries/prisma-functions";
import { ClientCollectionContainer } from "@/features/collection/components/ClientCollectionContainer";

export const revalidate = 300;

export default async function CollectionPage({ params }: { params: { userId: string } }) {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  if (userId !== params.userId) {
    // TODO: handle seeing other peoples collections if they are not private
    return <h1>NOT YOU, GET OUT</h1>;
  }

  const [getGenres, collection, playlists] = await Promise.all([
    getUserGenres(userId),
    getFullCollection(userId),
    getPlaylists(userId),
  ]);

  const genres = getGenres.map((g) => g.name);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-10 animate-in">
      <ClientCollectionContainer
        userId={userId}
        collection={collection}
        genres={genres}
        playlists={playlists}
      />
    </main>
  );
}
