/*
  Warnings:

  - You are about to drop the `UserGameCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserGameCollection" DROP CONSTRAINT "UserGameCollection_gameId_fkey";

-- DropForeignKey
ALTER TABLE "UserGameCollection" DROP CONSTRAINT "UserGameCollection_userId_fkey";

-- DropTable
DROP TABLE "UserGameCollection";
