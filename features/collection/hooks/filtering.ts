import { GameWithCoverAndGenres, SortOption } from "@/types";
import { applySorting } from "@/util/sorting";
import { useMemo, useState } from "react";

export const useSortAndFilter = (
	DEFAULT_SORT_OPTION: SortOption,
	genres: string[],
	games: GameWithCoverAndGenres[]
) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT_OPTION);
	const [genreFilter, setGenreFilter] = useState<string[]>(genres);
	const [checkedGames, setCheckedGames] = useState<number[]>([]);

	const filteredCollection = useMemo(() => {
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
	}, [searchTerm,  genreFilter, games]);

	const sortedCollection = useMemo(() => {
		return applySorting(filteredCollection, sortOption);
	}, [filteredCollection, sortOption]);

	const handleSearchTermChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleCheckedToggled = (gameId: number) => {
		if (checkedGames.includes(gameId)) {
			setCheckedGames(checkedGames.filter((game) => game !== gameId));
		} else {
			setCheckedGames([...checkedGames, gameId]);
		}
	};

	const handleCheckAll = () => {
		const collectionIds = filteredCollection.map((entry) => entry.gameId);
		console.log(collectionIds);
		setCheckedGames(collectionIds);
	};

	const handleUncheckAll = () => {
		setCheckedGames([]);
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
    // handle toggle all genres
    if (genres.length > genreFilter.length) {
      setGenreFilter(genres);
    } else {
      setGenreFilter([]);
    }
  };

	return {
		searchTerm,
		setSearchTerm,
		sortOption,
		setSortOption,
		checkedGames,
		genreFilter,
		setGenreFilter,
		sortedCollection,
		filteredCollection,
		handleSearchTermChanged,
		handleCheckedToggled,
		handleCheckAll,
		handleUncheckAll,
		handleGenreToggled,
		handleToggleAllGenres
	};
};
