import { CollectionView } from "@/components/collection/view/collection-view";
import { auth } from "@clerk/nextjs";
import { getCollection, getUserGenres } from "../(util)/queries";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default async function CollectionPage({ params }: { params: { userId: string } }) {
  console.time("collection page load");
  const { userId } = auth();
  if (userId !== params.userId) {
    return <h1>NOT YOU, GET OUT</h1>;
  }

  const [getGenres, collection] = await Promise.all([
    getUserGenres(userId),
    getCollection(userId),
  ]);

  const genres = getGenres.map((g) => g.name);
  console.timeEnd("collection page load");
  return (
    <main className="flex min-h-screen flex-col items-center space-y-10 p-24 animate-in">
      <CollectionView collection={collection} genres={genres} />
    </main>
  );
}
