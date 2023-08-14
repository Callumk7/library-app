import { PlaylistSidebar } from "@/components/playlists/playlist-sidebar";
import { getPlaylistsWithGames } from "@/lib/db/playlists/queries";
import { auth } from "@clerk/nextjs";

export default async function PlaylistLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
  const { userId } = auth();
  if (userId !== params.userId) {
    return <h1>NOT YOU, GET OUT</h1>;
  }

  const playlists = await getPlaylistsWithGames(userId);

  return (
    <div className="mt-10 grid grid-cols-4">
      <div className="col-span-1 w-auto">
        <PlaylistSidebar playlists={playlists} />
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
}
