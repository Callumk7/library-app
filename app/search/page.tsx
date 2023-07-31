import { auth } from "@clerk/nextjs";
import SearchContainer from "@/components/search/container";

export const dynamic = "auto";
// export const revalidate = 0;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { userId } = auth();

  return (
      <SearchContainer query={searchParams.q} />
  );
}
