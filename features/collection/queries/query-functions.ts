import { CollectionWithGamesGenresPlaylists } from "@/types";

// client function..
export async function fetchFullCollection(
	userId: string
): Promise<CollectionWithGamesGenresPlaylists[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTLINE_URL}/api/collection`, {
		method: "GET",
		headers: {
			user: userId,
		},
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await res.json();
	return data as CollectionWithGamesGenresPlaylists[];
}

export async function fetchCollectionIds(userId: string): Promise<number[]> {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_FRONTLINE_URL}/api/collection/ids`,
		{
			method: "GET",
			headers: {
				user: userId,
			},
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
		`${process.env.NEXT_PUBLIC_FRONTLINE_URL}/api/collection/games?gameId=${gameId}`,
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
