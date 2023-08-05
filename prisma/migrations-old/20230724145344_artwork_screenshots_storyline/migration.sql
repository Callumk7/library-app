/*
  Warnings:

  - You are about to drop the column `slug` on the `Genre` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "aggregatedRating" INTEGER,
ADD COLUMN     "aggregatedRatingCount" INTEGER,
ADD COLUMN     "storyline" TEXT;

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "slug";

-- CreateTable
CREATE TABLE "Artwork" (
    "id" SERIAL NOT NULL,
    "imageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Screenshot" (
    "id" SERIAL NOT NULL,
    "imageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Screenshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_gameId_key" ON "Artwork"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Screenshot_gameId_key" ON "Screenshot"("gameId");

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screenshot" ADD CONSTRAINT "Screenshot_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
