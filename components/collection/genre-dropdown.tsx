import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown";

export function GenreDropdownCheckboxItem({
  genre,
  genreFilter,
  handleGenreToggled,
}: {
  genre: string;
  genreFilter: string[];
  handleGenreToggled: (genre: string) => void;
}) {
  let checked = true;
  if (genreFilter.includes(genre)) {
    checked = true;
  } else {
    checked = false;
  }

  const handleToggle = () => {
    console.log(`${genre} toggled`);
    handleGenreToggled(genre);
  };

  return (
    <DropdownMenuCheckboxItem checked={checked} onCheckedChange={handleToggle}>
      {genre}
    </DropdownMenuCheckboxItem>
  );
}
