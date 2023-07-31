import { prisma } from "@/lib/prisma/client";
import { auth } from "@clerk/nextjs";

async function getPlaylists(userId: string) {
  console.log(`user id passed to function: ${ userId }`);
  const getPlaylists = await prisma.playlist.findMany({
    where: {
      userId,
    },
  });
  console.log(getPlaylists);
  return getPlaylists;
}

export default async function PlaylistView() {
  const { userId } = auth();
  if (!userId) {
    return <div>No playlists</div>;
  }
  const playlists = await getPlaylists(userId);
  console.log(playlists);
  return (
    <div className="flex flex-wrap gap-4">
      {playlists.map((playlist, index) => (
        <div className="border rounded-md p-3" key={index}>{playlist.name}</div>
      ))}
    </div>
  );
}
