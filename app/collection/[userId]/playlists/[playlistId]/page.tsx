import { Button } from "@/components/ui/button";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import { getUserGenres } from "@/features/collection/queries/prisma-functions";
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

  const [playlist, games, genres] = await Promise.all([
    getPlaylist(Number(params.playlistId)),
    getGamesInPlaylist(Number(params.playlistId)),
    getUserGenres(userId),
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-10">
      <h1 className="text-5xl font-bold">{playlist?.name}</h1>
      <Button size={"icon"}>
        <MenuIcon />
      </Button>
      <PlaylistContainer
        userId={userId}
        playlistId={playlistId}
        games={games}
        genres={genres}
      />
    </main>
  );
}
