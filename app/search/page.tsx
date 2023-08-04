import { SearchContainer } from "./(components)/container";

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  return <SearchContainer query={searchParams.q} />;
}
