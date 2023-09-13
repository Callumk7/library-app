import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getAllGames } from "../hooks/queries";
import { ClientSearchContainer } from "./ClientSearchContainer";

export async function GameViewServer() {
  const session = await getServerSession(options);
  if (!session) {
    return <div>time to login</div>
  }
  if (session) {
    const userId = session.user.id;
    const games = await getAllGames();

    return (
      <ClientSearchContainer userId={userId} resultsWithUsers={games} />
    )
  }
}
