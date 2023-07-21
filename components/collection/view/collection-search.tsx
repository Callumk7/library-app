interface CollectionSearchProps {
  searchTerm: string;
  handleSearchTermChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CollectionSearch({
  searchTerm,
  handleSearchTermChanged,
}: CollectionSearchProps) {
  return (
    <input
      type="text"
      name="search"
      className="rounded-md border bg-inherit px-4 py-2 focus:border-foreground"
      value={searchTerm}
      placeholder="search for a game"
      onChange={handleSearchTermChanged}
    />
  );
}
