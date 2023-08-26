import { getUserGenres } from "@/features/collection/queries/prisma-functions";
import { PlaylistContainer } from "@/features/playlists/components/PlaylistContainer";
import { getGamesFromPlaylist, getPlaylistWithGames } from "@/features/playlists/hooks/queries";

export default async function PlaylistPage({
  params,
}: {
  params: { userId: string; playlistId: string };
}) {
  const playlistId = Number(params.playlistId);
  const userId = params.userId;

  const [games, genres] = await Promise.all([
    getGamesFromPlaylist(Number(params.playlistId)),
    getUserGenres(userId),
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-10">
      <PlaylistContainer
        userId={userId}
        playlistId={playlistId}
        games={games}
        genres={genres}
      />
    </main>
  );
}
