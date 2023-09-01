import { PlaylistCard } from "@/features/playlists/components/PlaylistCard";
import { getAllPlaylistsWithGames } from "@/features/playlists/hooks/queries";
import { PlaylistWithGamesAndCover } from "@/types";

export default async function PlaylistsPage() {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";

  if (!userId) {
    return <div>Get the hell out of this place</div>;
  }

  const playlistsWithGames: PlaylistWithGamesAndCover[] = await getAllPlaylistsWithGames(
    userId
  );

  return (
    <main className="mx-auto grid grid-cols-3 items-center gap-16 p-24 animate-in">
      {playlistsWithGames.map((playlist, index) => (
        <PlaylistCard key={index} playlist={playlist} />
      ))}
    </main>
  );
}
