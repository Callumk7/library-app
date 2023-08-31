import { CollectionNavbar } from "@/features/collection/components/CollectionNavbar";
import { PlaylistSidebar } from "@/features/playlists/components/PlaylistSidebar";
import { getAllPlaylistsWithGames } from "@/features/playlists/hooks/queries";
import { getUserGenres } from "@/lib/hooks/genres/queries";

export default async function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  const playlists = await getAllPlaylistsWithGames(userId);
  const genres = await getUserGenres(userId);
  return (
    <div className="mt-5 flex w-4/5 flex-row justify-start gap-4 px-4 md:w-full">
      <div className="hidden md:block">
        <PlaylistSidebar playlists={playlists} userId={userId} />
      </div>
      <div className="self-stretch">
        <CollectionNavbar userId={userId} genres={genres} />
        {children}
      </div>
    </div>
  );
}
