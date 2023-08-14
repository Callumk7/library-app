import { PlaylistCard } from "@/components/playlists/playlist-card";
import { getPlaylistsWithGames } from "@/lib/db/playlists/queries";
import { PlaylistWithGamesAndCover } from "@/types";
import { auth } from "@clerk/nextjs";

export default async function PlaylistsPage() {
  const { userId } = auth();

  if (!userId) {
    return <div>Get the hell out of this place</div>;
  }

  const playlistsWithGames: PlaylistWithGamesAndCover[] = await getPlaylistsWithGames(
    userId
  );

  return (
    <main className="flex mx-auto flex-wrap items-center gap-10 p-24 animate-in">
      {playlistsWithGames.map((playlist, index) => (
        <PlaylistCard key={index} playlist={playlist} />
      ))}
    </main>
  );
}
