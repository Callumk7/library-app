/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "emailverified" TEXT;

-- CreateTable
CREATE TABLE "PlaylistsOnUserGameCollections" (
    "playlistId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlaylistsOnUserGameCollections_pkey" PRIMARY KEY ("playlistId","userId","gameId")
);

-- AddForeignKey
ALTER TABLE "PlaylistsOnUserGameCollections" ADD CONSTRAINT "PlaylistsOnUserGameCollections_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistsOnUserGameCollections" ADD CONSTRAINT "PlaylistsOnUserGameCollections_userId_gameId_fkey" FOREIGN KEY ("userId", "gameId") REFERENCES "UserGameCollection"("userId", "gameId") ON DELETE RESTRICT ON UPDATE CASCADE;
