-- CreateTable
CREATE TABLE "FollowersOnPlaylists" (
    "userId" TEXT NOT NULL,
    "playlistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FollowersOnPlaylists_pkey" PRIMARY KEY ("userId","playlistId")
);

-- AddForeignKey
ALTER TABLE "FollowersOnPlaylists" ADD CONSTRAINT "FollowersOnPlaylists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowersOnPlaylists" ADD CONSTRAINT "FollowersOnPlaylists_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
