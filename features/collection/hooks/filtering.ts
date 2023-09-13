import { GameWithCoverAndGenres, SortOption } from "@/types";
import { applySorting } from "@/util/sorting";
import { useMemo, useState } from "react";

export const useFilter = (games: GameWithCoverAndGenres[], genres: string[]) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [genreFilter, setGenreFilter] = useState<string[]>(genres);

	const filteredGames = useMemo(() => {
		let output = [...games];
		if (searchTerm !== "") {
			output = output.filter((game) =>
				game.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		output = output.filter((game) => {
			if (game.genres.length === 0) {
				return true;
			}
			for (const genre of game.genres) {
				if (genreFilter.includes(genre.genre.name)) {
					return true;
				}
			}
			return false;
		});
		return output;
	}, [searchTerm, genreFilter, games]);

	const handleSearchTermChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleGenreToggled = (genre: string) => {
		// handle genre toggled
		setGenreFilter((prevGenreFilter) =>
			prevGenreFilter.includes(genre)
				? prevGenreFilter.filter((g) => g !== genre)
				: [...prevGenreFilter, genre]
		);
	};

	const handleToggleAllGenres = () => {
		if (genres.length > genreFilter.length) {
			setGenreFilter(genres);
		} else {
			setGenreFilter([]);
		}
	};

	return {
		searchTerm,
		setSearchTerm,
		genreFilter,
		setGenreFilter,
		filteredGames,
		handleSearchTermChanged,
		handleGenreToggled,
		handleToggleAllGenres,
	};
};

export const useSort = (
	DEFAULT_SORT_OPTION: SortOption,
	games: GameWithCoverAndGenres[]
) => {
	const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT_OPTION);


	const sortedGames = useMemo(() => {
		return applySorting(games, sortOption);
	}, [games, sortOption]);


	return {
		sortOption,
		setSortOption,
		sortedGames,
	};
};
