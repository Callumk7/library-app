import { PlaylistSidebar } from "@/features/playlists/components/PlaylistSidebar";
import { getPlaylistsWithGames } from "@/features/playlists/queries/prisma-functions";

export default async function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  const playlists = await getPlaylistsWithGames(userId);
  return (
    <div className="mx-4 mt-10 flex flex-row space-x-4">
      <div className="hidden md:block">
        <PlaylistSidebar playlists={playlists} userId={userId} />
      </div>
      {children}
    </div>
  );
}
