/*
  Warnings:

  - You are about to drop the `_GameToGenre` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `releaseDate` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_GameToGenre" DROP CONSTRAINT "_GameToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToGenre" DROP CONSTRAINT "_GameToGenre_B_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_GameToGenre";

-- CreateTable
CREATE TABLE "GenresOnGames" (
    "gameId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GenresOnGames_pkey" PRIMARY KEY ("gameId","genreId")
);

-- AddForeignKey
ALTER TABLE "GenresOnGames" ADD CONSTRAINT "GenresOnGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("externalId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnGames" ADD CONSTRAINT "GenresOnGames_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
