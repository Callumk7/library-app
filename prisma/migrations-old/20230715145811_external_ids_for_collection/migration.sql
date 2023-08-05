/*
  Warnings:

  - The primary key for the `UserGameCollection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `UserGameCollection` table. All the data in the column will be lost.
  - Added the required column `clerkId` to the `UserGameCollection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserGameCollection" DROP CONSTRAINT "UserGameCollection_gameId_fkey";

-- DropForeignKey
ALTER TABLE "UserGameCollection" DROP CONSTRAINT "UserGameCollection_userId_fkey";

-- AlterTable
ALTER TABLE "UserGameCollection" DROP CONSTRAINT "UserGameCollection_pkey",
DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD CONSTRAINT "UserGameCollection_pkey" PRIMARY KEY ("clerkId", "gameId");

-- AddForeignKey
ALTER TABLE "UserGameCollection" ADD CONSTRAINT "UserGameCollection_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("externalId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameCollection" ADD CONSTRAINT "UserGameCollection_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
