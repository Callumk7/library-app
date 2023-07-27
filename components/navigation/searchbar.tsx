"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.refresh();
    router.push(`/search?q=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        name="q"
        className="rounded-md border bg-inherit px-4 py-2 focus:border-foreground"
        value={searchTerm}
        placeholder="search for a game"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
