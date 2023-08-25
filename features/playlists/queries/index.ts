import { GameWithCoverAndGenres, PlaylistWithGames } from "@/types";
import { Playlist } from "@prisma/client";

export async function fetchUserPlaylists(userId: string): Promise<PlaylistWithGames[]> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_FRONTLINE_URL}/api/playlists?userId=${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		}
	);

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as PlaylistWithGames[];
}

export async function fetchGamePlaylists(gameId: number): Promise<Playlist[]> {
	const res = await fetch(
		`/api/games/playlists?gameId=${gameId}`,
		{
			method: "GET",
		}
	);

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as Playlist[];
}

export async function fetchGamesFromPlaylist(
	userId: string,
	playlistId: number
): Promise<GameWithCoverAndGenres[]> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_FRONTLINE_URL}/api/playlists?userId=${userId}&playlistId=${playlistId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		}
	);

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as GameWithCoverAndGenres[];
}

export async function fetchUserPlaylistTitles(userId: string): Promise<string[]> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_FRONTLINE_URL}/api/playlists/names?userId=${userId}`,
		{
			method: "GET",
		}
	);

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as string[];
}

export async function deletePlaylistFromServer(playlistId: number) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_FRONTLINE_URL}/api/playlists?playlistId=${playlistId}`,
		{
			method: "DELETE",
		}
	);

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as Playlist;
}
