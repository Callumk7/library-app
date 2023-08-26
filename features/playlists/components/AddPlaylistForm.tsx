import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { useState } from "react";
import { useAddPlaylist } from "../hooks/mutations";

export default function AddPlaylistForm({ userId }: { userId: string }) {
  const [playlistName, setPlaylistName] = useState("");

  const addPlaylist = useAddPlaylist(userId);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addPlaylist.mutate(playlistName);
      }}
      className="flex flex-row items-center space-x-3"
    >
      <Input
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        name="name"
        placeholder="Best RPGs ever.."
      />
      <Button variant={"outline"} size={"sm"} disabled={addPlaylist.isLoading}>
        {addPlaylist.isLoading ? "adding" : "add"}
      </Button>
    </form>
  );
}
