import { CollectionView } from "@/components/collection/view/collection-view";
import { CollectionWithGames } from "@/types";
import { auth } from "@clerk/nextjs";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function CollectionPage() {
  const { userId } = auth();
  if (!userId) {
    return <h1>User not found</h1>;
  }
  const res = await fetch(`http://localhost:3000/api/collection/`, {
    method: "GET",
    headers: {
      user: userId,
    },
    next: { revalidate: 0, tags: ["collection"] },
  });
  const data: CollectionWithGames[] = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between space-y-10 p-24">
      <Suspense>
        <CollectionView collection={data} />
      </Suspense>
    </main>
  );
}
