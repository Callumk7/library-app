import { PlayListContainer } from "@/components/playlists/playlist-container";
import { getPlaylists } from "@/lib/prisma/playlists/queries";
import { auth } from "@clerk/nextjs";

export default async function PlaylistsPage() {
  const { userId } = auth();
  if (!userId) {
    return <div>No playlists</div>;
  }
  const playlists = await getPlaylists(userId);
  return (
    <div>
      <PlayListContainer playlists={playlists} />
    </div>
  );
}
