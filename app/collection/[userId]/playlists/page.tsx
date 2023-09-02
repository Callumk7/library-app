import { options } from "@/app/api/auth/[...nextauth]/options";
import { PlaylistCard } from "@/features/playlists/components/PlaylistCard";
import { getAllPlaylistsWithGames } from "@/features/playlists/hooks/queries";
import { PlaylistWithGamesAndCover } from "@/types";
import { getServerSession } from "next-auth";

export default async function PlaylistsPage() {
  const session = await getServerSession(options);

  if (!session) {
    return (
      <div>
        <p>Time to login</p>
      </div>
    );
  }

  if (session) {
    const userId = session.user.id;
    const playlistsWithGames: PlaylistWithGamesAndCover[] =
      await getAllPlaylistsWithGames(userId);

    return (
      <main className="mx-auto grid grid-cols-3 items-center gap-16 p-24 animate-in">
        {playlistsWithGames.map((playlist, index) => (
          <PlaylistCard key={index} playlist={playlist} />
        ))}
      </main>
    );
  }
}
