import { Search } from "../ui/form";

interface CollectionSearchProps {
  searchTerm: string;
  handleSearchTermChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CollectionSearch({
  searchTerm,
  handleSearchTermChanged,
}: CollectionSearchProps) {
  return (
    <Search
      searchTerm={searchTerm}
      onChange={handleSearchTermChanged}
      placeholder="Search for a game"
    />
  );
}
