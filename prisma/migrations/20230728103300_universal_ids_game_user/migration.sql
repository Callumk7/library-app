/*
  Warnings:

  - You are about to drop the column `externalId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `clerkId` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserGameCollection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clerkId` on the `UserGameCollection` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gameId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserGameCollection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Artwork" DROP CONSTRAINT "Artwork_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Cover" DROP CONSTRAINT "Cover_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GenresOnGames" DROP CONSTRAINT "GenresOnGames_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Screenshot" DROP CONSTRAINT "Screenshot_gameId_fkey";

-- DropForeignKey
ALTER TABLE "UserGameCollection" DROP CONSTRAINT "UserGameCollection_clerkId_fkey";

-- DropForeignKey
ALTER TABLE "UserGameCollection" DROP CONSTRAINT "UserGameCollection_gameId_fkey";

-- DropIndex
DROP INDEX "Game_externalId_key";

-- DropIndex
DROP INDEX "User_clerkId_key";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "externalId",
ADD COLUMN     "gameId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clerkId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserGameCollection" DROP CONSTRAINT "UserGameCollection_pkey",
DROP COLUMN "clerkId",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "UserGameCollection_pkey" PRIMARY KEY ("userId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Game_gameId_key" ON "Game"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- AddForeignKey
ALTER TABLE "UserGameCollection" ADD CONSTRAINT "UserGameCollection_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameCollection" ADD CONSTRAINT "UserGameCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnGames" ADD CONSTRAINT "GenresOnGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cover" ADD CONSTRAINT "Cover_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screenshot" ADD CONSTRAINT "Screenshot_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;
