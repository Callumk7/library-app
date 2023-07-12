/*
  Warnings:

  - A unique constraint covering the columns `[gameCollectionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gameCollectionId" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "UserGameCollection" (
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserGameCollection_pkey" PRIMARY KEY ("userId","gameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_gameCollectionId_key" ON "User"("gameCollectionId");

-- AddForeignKey
ALTER TABLE "UserGameCollection" ADD CONSTRAINT "UserGameCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("gameCollectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameCollection" ADD CONSTRAINT "UserGameCollection_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
