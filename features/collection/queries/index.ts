import { CollectionWithGamesGenresPlaylists } from "@/types";

export async function fetchFullCollection(
	userId: string
): Promise<CollectionWithGamesGenresPlaylists[]> {
	const res = await fetch(
		`/api/collection?userId=${userId}`,
		{
			method: "GET",
		}
	);

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as CollectionWithGamesGenresPlaylists[];
}

export async function fetchCollectionGameIds(userId: string): Promise<number[]> {
	const res = await fetch(
		`/api/collection/ids?userId=${userId}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		}
	);

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as number[];
}

export async function addGameToCollection(
	gameId: number
): Promise<{ userId: string; gameId: number }> {
	const res = await fetch(
		`/api/collection/games?gameId=${gameId}`,
		{
			method: "POST",
		}
	);

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as { userId: string; gameId: number };
}

export async function fetchUserGenres(userId: string): Promise<string[]> {
	const res = await fetch(
		`/api/genres?userId=${userId}`,
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
