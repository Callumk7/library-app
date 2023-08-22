import { PlaylistContainer } from "@/features/playlists/components/PlaylistContainer";
import {
  getGamesInPlaylist,
  getPlaylist,
} from "@/features/playlists/queries/prisma-functions";

export default async function PlaylistPage({
  params,
}: {
  params: { userId: string; playlistId: string };
}) {
  const playlistId = Number(params.playlistId);
  const userId = params.userId;

  const [playlist, games] = await Promise.all([
    getPlaylist(Number(params.playlistId)),
    getGamesInPlaylist(Number(params.playlistId)),
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-10 animate-in">
      <h1 className="text-5xl font-bold">{playlist?.name}</h1>
      <PlaylistContainer userId={userId} playlistId={playlistId} games={games} />
    </main>
  );
}
