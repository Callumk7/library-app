import { CollectionView } from "@/components/collection/view/collection-view";
import { CollectionWithGames } from "@/types";
import { auth } from "@clerk/nextjs";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CollectionPage({ params }: { params: { userId: string } }) {
  const { userId } = auth();
  if (userId !== params.userId) {
    return <h1>NOT YOU, GET OUT</h1>;
  }
  const res = await fetch(`${process.env.APP_URL}/api/collection/`, {
    method: "GET",
    headers: {
      user: userId,
    },
    next: { revalidate: 0, tags: ["collection"] },
  });
  const data: CollectionWithGames[] = await res.json();

  return (
    <main className="animate-in flex min-h-screen flex-col items-center justify-between space-y-10 p-24">
      <Suspense>
        <CollectionView collection={data} />
      </Suspense>
    </main>
  );
}
