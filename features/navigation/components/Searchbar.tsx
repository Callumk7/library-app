"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const splitSearchTerm = searchTerm.split(" ");
    // let parsedTerm = "";
    // for (let i = 0; i < splitSearchTerm.length; i++) {
    //   const term = splitSearchTerm[i];
    //   if (i === 0) {
    //     parsedTerm += term;
    //   } else if (i < splitSearchTerm.length) {
    //     parsedTerm += "+";
    //     parsedTerm += term;
    //   }
    // }
    router.push(`/search?q=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-row items-center gap-3">
      <Input
        value={searchTerm}
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
