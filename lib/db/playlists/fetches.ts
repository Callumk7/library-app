import { Playlist } from "@prisma/client";

export async function fetchUserPlaylists(userId: string) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTLINE_URL}/api/playlists`, {
		method: "GET",
		headers: {
			user: userId,
		},
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as Playlist[];
}
