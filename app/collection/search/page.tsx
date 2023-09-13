import { options } from "@/app/api/auth/[...nextauth]/options";
import { ClientSearchContainer } from "@/features/search/components/ClientSearchContainer";
import { getAllGames } from "@/features/search/hooks/queries";
import { getUserGenres } from "@/lib/hooks/genres/queries";
import { getSearchResults } from "@/util/igdb";
import { getServerSession } from "next-auth";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  let query = searchParams.q;
  if (!searchParams.q) {
    query = "";
  }

  const session = await getServerSession(options);
  if (!session) {
    return <div>time to login</div>;
  }

  if (session) {
    const userId = session.user.id;
    // get external results
    const games = await getAllGames();
    const genres = await getUserGenres(userId);

    // get gameIds
    const gameIds = [];
    for (const game of games) {
      gameIds.push(game.gameId);
    }

    return (
      <div className="mx-4 mt-10 flex flex-col space-y-5">
        <ClientSearchContainer
          userId={userId}
          games={games}
          genres={genres}
        />
      </div>
    );
  }
}
