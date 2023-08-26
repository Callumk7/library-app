import { PlaylistCard } from "@/features/playlists/components/PlaylistCard";
import { getPlaylistsWithGames } from "@/features/playlists/hooks/queries";
import { PlaylistWithGamesAndCover } from "@/types";

export default async function PlaylistsPage() {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";

  if (!userId) {
    return <div>Get the hell out of this place</div>;
  }

  const playlistsWithGames: PlaylistWithGamesAndCover[] = await getPlaylistsWithGames(
    userId
  );

  return (
    <main className="mx-auto flex flex-wrap items-center gap-10 p-24 animate-in">
      {playlistsWithGames.map((playlist, index) => (
        <PlaylistCard key={index} playlist={playlist} />
      ))}
    </main>
  );
}
