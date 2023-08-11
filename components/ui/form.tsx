import clsx from "clsx";

const Input = ({
  value,
  onChange,
  name,
  className,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  placeholder?: string;
}) => {
  return (
    <input
      type="text"
      name={name ? name : "input"}
      className={clsx(
        className,
        "rounded-md border bg-inherit px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export { Input };
