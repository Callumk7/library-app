"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Search } from "../ui/form";

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
      <Search
        searchTerm={searchTerm}
        name="q"
        placeholder="search for a game"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant={"outline"} size={"sm"}>
        Search
      </Button>
    </form>
  );
}
