import { ChangeEvent, FormEvent } from "react";

interface CreatePlaylistFormProps {
  handleSubmit: () => void;
  handleChange: (name: string) => void;
  newPlaylistName: string;
}

export default function CreatePlaylistForm({
  handleSubmit,
  handleChange,
  newPlaylistName,
}: CreatePlaylistFormProps) {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <form className="flex flex-col space-y-2 text-black" onSubmit={handleFormSubmit}>
      <input onChange={handleNameChange} value={newPlaylistName} />
    </form>
  );
}
