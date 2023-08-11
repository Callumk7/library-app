import { PlaylistNavBar } from "@/components/playlists/navbar";
import { getPlaylists, getPlaylistsWithGames } from "@/lib/prisma/playlists/queries";
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

  const playlists = await getPlaylists(userId);

  return (
    <div className="mt-10">
      <PlaylistNavBar playlists={playlists} />
      {children}
    </div>
  );
}
