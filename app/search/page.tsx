import { SearchContainer } from "./(components)/container";

export const dynamic = "auto";
// export const revalidate = 0;

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {

  return (
      <SearchContainer query={searchParams.q} />
  );
}
