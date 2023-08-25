import { GameCardCover } from "@/components/games/GameCardCover";
import { getTopRatedGames } from "@/features/dashboard/queries/prisma-functions";
import { SearchResultEntryControls } from "@/features/search/components/SearchResultEntryControls";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  const games = await getTopRatedGames(30);
  return (
    <main className="mx-auto my-10 grid w-4/5 grid-cols-2 gap-5 md:grid-cols-3">
      {games.map((game, index) => (
        <GameCardCover key={index} game={game} isCompleted={false}>
          <SearchResultEntryControls userId={userId} game={game} />
        </GameCardCover>
      ))}
    </main>
  );
}
