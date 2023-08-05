-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "aggregatedRating" DOUBLE PRECISION,
    "aggregatedRatingCount" INTEGER,
    "storyline" TEXT,
    "releaseDate" INTEGER,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGameCollection" (
    "userId" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "played" BOOLEAN NOT NULL DEFAULT false,
    "playerRating" INTEGER,
    "starred" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserGameCollection_pkey" PRIMARY KEY ("userId","gameId")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaylistsOnGames" (
    "gameId" INTEGER NOT NULL,
    "playlistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlaylistsOnGames_pkey" PRIMARY KEY ("gameId","playlistId")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenresOnGames" (
    "gameId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GenresOnGames_pkey" PRIMARY KEY ("gameId","genreId")
);

-- CreateTable
CREATE TABLE "Cover" (
    "id" SERIAL NOT NULL,
    "imageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Cover_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Game_gameId_key" ON "Game"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_externalId_key" ON "Genre"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Cover_imageId_key" ON "Cover"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Cover_gameId_key" ON "Cover"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_imageId_key" ON "Artwork"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Screenshot_imageId_key" ON "Screenshot"("imageId");

-- AddForeignKey
ALTER TABLE "UserGameCollection" ADD CONSTRAINT "UserGameCollection_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameCollection" ADD CONSTRAINT "UserGameCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistsOnGames" ADD CONSTRAINT "PlaylistsOnGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistsOnGames" ADD CONSTRAINT "PlaylistsOnGames_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnGames" ADD CONSTRAINT "GenresOnGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnGames" ADD CONSTRAINT "GenresOnGames_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cover" ADD CONSTRAINT "Cover_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screenshot" ADD CONSTRAINT "Screenshot_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;
