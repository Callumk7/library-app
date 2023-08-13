import { Input } from "../ui/form";

interface CollectionSearchProps {
  searchTerm: string;
  handleSearchTermChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CollectionSearch({
  searchTerm,
  handleSearchTermChanged,
}: CollectionSearchProps) {
  return (
    <Input
      value={searchTerm}
      name="search"
      onChange={handleSearchTermChanged}
      placeholder="Search for a game"
    />
  );
}
