import { CollectionNavbar } from "@/features/collection/components/CollectionNavbar";
import { PlaylistSidebar } from "@/features/playlists/components/PlaylistSidebar";
import {
  getAllPlaylistsWithGames,
  getFollowedPlaylistsWithGames,
} from "@/features/playlists/hooks/queries";
import { getUserGenres } from "@/lib/hooks/genres/queries";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    const playlists = await getAllPlaylistsWithGames(userId);
    const followedPlaylists = await getFollowedPlaylistsWithGames(userId);
    const genres = await getUserGenres(userId);
    return (
      <div className="mx-auto mt-5 flex w-4/5 flex-row justify-start gap-4 px-4 md:w-full">
        <div className="hidden md:block">
          <PlaylistSidebar
            playlists={playlists}
            userId={userId}
            followedPlaylists={followedPlaylists}
          />
        </div>
        <div className="w-full self-stretch">
          <CollectionNavbar userId={userId} genres={genres} />
          {children}
        </div>
      </div>
    );
  }
}
