import { GameCardCover } from "@/components/games/GameCardCover";
import { getTopRatedGames } from "@/features/dashboard/queries/prisma-functions";

export default async function HomePage() {
  const games = await getTopRatedGames(10);
  return (
    <main className="mx-auto grid w-4/5 grid-cols-2 gap-5 my-10 md:grid-cols-3">
      {games.map((game, index) => (
        <GameCardCover key={index} game={game} isCompleted={false}>
          <div>controls</div>
        </GameCardCover>
      ))}
    </main>
  );
}
