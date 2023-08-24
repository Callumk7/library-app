-- DropForeignKey
ALTER TABLE "PlaylistsOnGames" DROP CONSTRAINT "PlaylistsOnGames_playlistId_fkey";

-- AddForeignKey
ALTER TABLE "PlaylistsOnGames" ADD CONSTRAINT "PlaylistsOnGames_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
