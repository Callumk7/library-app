import { PlaylistSidebar } from "@/features/playlists/components/PlaylistSidebar";
import { getAllPlaylistsWithGames } from "@/features/playlists/hooks/queries";
import { DBSearchResultsWrapper } from "@/features/search/components/DBSearchResultsWrapper";
import { ExternalResultsWrapper } from "@/features/search/components/ExternalResultsWrapper";
import { getSearchResults } from "@/util/igdb";

export default async function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  const playlists = await getAllPlaylistsWithGames(userId);
  return (
    <div className="mt-10 flex w-4/5 flex-row justify-between gap-4 px-4 md:w-full">
      <div className="hidden place-self-start justify-self-start md:block">
        <PlaylistSidebar playlists={playlists} userId={userId} />
        <DBSearchResultsWrapper userId={userId} />
        <ExternalResultsWrapper />
      </div>
      {children}
    </div>
  );
}
