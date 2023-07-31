"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.refresh();
    router.push(`/search?q=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-row space-x-3 items-center">
      <input
        type="text"
        name="q"
        className="rounded-md border bg-inherit px-4 py-2 focus:border-foreground"
        value={searchTerm}
        placeholder="search for a game"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant={"outline"} size={"sm"}>
        Search
      </Button>
    </form>
  );
}
