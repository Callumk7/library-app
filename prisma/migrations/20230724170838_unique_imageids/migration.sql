/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `Artwork` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `Cover` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `Screenshot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Artwork_imageId_key" ON "Artwork"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Cover_imageId_key" ON "Cover"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Screenshot_imageId_key" ON "Screenshot"("imageId");
