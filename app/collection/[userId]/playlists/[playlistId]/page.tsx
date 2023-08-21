import { PlaylistContainer } from "@/features/playlists/components/PlaylistContainer";
import { getGamesInPlaylist } from "@/features/playlists/queries/prisma-functions";

export default async function PlaylistPage({
  params,
}: {
  params: { userId: string; playlistId: string };
}) {
  const playlistId = Number(params.playlistId);
  const userId = params.userId;
  const games = await getGamesInPlaylist(Number(params.playlistId));
  return (
    <main className="flex min-h-screen flex-col items-center space-y-10 animate-in">
      <PlaylistContainer userId={userId} playlistId={playlistId} games={games} />
    </main>
  );
}
