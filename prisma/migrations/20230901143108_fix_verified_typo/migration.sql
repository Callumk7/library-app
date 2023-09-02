/*
  Warnings:

  - You are about to drop the column `emailverified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailverified",
ADD COLUMN     "emailVerified" TEXT;
