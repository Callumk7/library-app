import { queryClient } from "@/lib/db/query";
import { Playlist } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

const postPlaylist = async (userId: string, playlistName: string) => {
	const body = { name: playlistName };
	const res = await fetch(`api/playlists?userId=${userId}`, {
		method: "POST",
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as Playlist;
};

export const useAddPlaylist = (userId: string) => {
	const addMutation = useMutation({
		mutationFn: (playlistName: string) => {
			console.log("adding playlist..");
			return postPlaylist(userId, playlistName);
		},

		onSuccess: (playlist) => {
			console.log(`success ${playlist.name} created`);
			queryClient.invalidateQueries(["playlists", userId]);
		},
	});
};
