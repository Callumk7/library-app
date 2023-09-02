"use client";

import { useState } from "react";
import { useDbSearchQuery } from "../hooks/queries";
import { Input } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ClientSearchContainer } from "./ClientSearchContainer";

export function DBSearchResultsWrapper({ userId }: { userId: string }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dbSearchQuery = useDbSearchQuery(searchTerm);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dbSearchQuery.refetch();
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
      {dbSearchQuery.isLoading && <div>loading...</div>}
      {dbSearchQuery.isError && <div>error!!</div>}
      {dbSearchQuery.isSuccess && (
        <ClientSearchContainer userId={userId} resultsWithUsers={dbSearchQuery.data} />
      )}
    </>
  );
}
