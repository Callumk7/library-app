import { ClientCollectionContainer } from "@/features/collection/components/ClientCollectionContainer";
import { GenreFilter } from "@/features/collection/components/GenreFilter";
import { getFullCollection } from "@/features/collection/hooks/queries";
import { getUserGenres } from "@/lib/hooks/genres/queries";

export default async function CollectionPage({ params }: { params: { userId: string } }) {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  if (userId !== params.userId) {
    // TODO: handle seeing other peoples collections if they are not private
    return <h1>NOT YOU, GET OUT</h1>;
  }

  const [genres, collection] = await Promise.all([
    getUserGenres(userId),
    getFullCollection(userId),
  ]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center space-y-10 animate-in">
      <ClientCollectionContainer
        userId={userId}
        collection={collection}
        genres={genres}
      />
    </main>
  );
}
