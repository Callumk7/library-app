import clsx from "clsx";

const Search = ({
  searchTerm,
  onChange,
  name,
  className,
  placeholder,
}: {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  placeholder?: string;
}) => {
  return (
    <input
      type="text"
      name={name ? name : "search"}
      className={clsx(
        className,
        "rounded-md border bg-inherit px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      value={searchTerm}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export { Search };
