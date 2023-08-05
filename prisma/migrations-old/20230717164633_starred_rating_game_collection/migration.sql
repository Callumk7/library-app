-- AlterTable
ALTER TABLE "UserGameCollection" ADD COLUMN     "played" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playerRating" INTEGER,
ADD COLUMN     "starred" BOOLEAN NOT NULL DEFAULT false;
