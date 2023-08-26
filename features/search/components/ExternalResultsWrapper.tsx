"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { getSearchResultsFromRoute } from "@/util/igdb";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ExternalResultsContainer } from "./ExternalResultsContainer";

export function ExternalResultsWrapper() {
  const [searchTerm, setSearchTerm] = useState<string>("halo");
  const searchQuery = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => getSearchResultsFromRoute(searchTerm),
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          searchQuery.refetch();
        }}
        className="flex flex-row items-center gap-3"
      >
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
      {searchQuery.isLoading && <div>loading...</div>}
      {searchQuery.isError && <div>error!!</div>}
      {searchQuery.isSuccess && <ExternalResultsContainer results={searchQuery.data} />}
      
    </>
  );
}
