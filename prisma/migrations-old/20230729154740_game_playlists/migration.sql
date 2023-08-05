-- CreateTable
CREATE TABLE "Playlist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaylistsOnGames" (
    "gameId" INTEGER NOT NULL,
    "playlistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlaylistsOnGames_pkey" PRIMARY KEY ("gameId","playlistId")
);

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistsOnGames" ADD CONSTRAINT "PlaylistsOnGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistsOnGames" ADD CONSTRAINT "PlaylistsOnGames_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
