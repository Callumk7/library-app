import { GameCardCover } from "@/components/games/GameCardCover";
import { getTopRatedGames } from "@/features/dashboard/hooks/queries";
import { SearchResultEntryControls } from "@/features/search/components/SearchResultEntryControls";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  const games = await getTopRatedGames(6);
  return (
    <main className="flex flex-col space-y-10">
      <div className="flex flex-col space-y-3">
        <h2>Top rated games</h2>
        <div className="mx-auto my-10 grid w-4/5 grid-cols-2 gap-5 md:grid-cols-3">
          {games.map((game, index) => (
            <GameCardCover key={index} game={game} isCompleted={false}>
              <SearchResultEntryControls userId={userId} game={game} />
            </GameCardCover>
          ))}
        </div>
      </div>
    </main>
  );
}
