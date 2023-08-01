import PlayListContainer from "@/components/playlists/playlist-container";
import PlaylistView from "@/components/playlists/playlist-view";

export default function PlaylistsPage() {
  return (
    <div>
      <h1>Playlists</h1>
      <PlayListContainer>
        <PlaylistView />
      </PlayListContainer>
    </div>
  );
}
