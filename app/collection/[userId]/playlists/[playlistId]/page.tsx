import { PlaylistContainer } from "@/components/playlists/container";
import { getGamesInPlaylist } from "@/lib/db/playlists/queries";

export default async function PlaylistPage({
  params,
}: {
  params: { userId: string; playlistId: string };
}) {
  const games = await getGamesInPlaylist(Number(params.playlistId));
  return (
    <main className="flex min-h-screen flex-col items-center space-y-10 p-24 animate-in">
      <PlaylistContainer games={games} />
    </main>
  );
}
