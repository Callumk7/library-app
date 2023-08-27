"use client";

import { GameWithCoverAndGenres } from "@/types";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Add } from "../ui/icons/Add";
import { Tag } from "../ui/tag";
import { InCollectionTag } from "./InCollectionTag";
import { useState } from "react";
import { Label } from "../ui/label";
interface GenreTagsProps {
  game: GameWithCoverAndGenres;
}
export function GenreTags({ game }: GenreTagsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const firstGenres = game.genres.slice(0, 1);
  const lastGenres = game.genres.slice(2);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="m-2 flex flex-col gap-2">
      <div className="flex-flex-row space-x-1 align-middle">
        <CollapsibleTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <Add />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="flex flex-wrap gap-2">
        {firstGenres.length > 0 &&
          firstGenres.map((genre, index) => <Tag key={index}>{genre.genre.name}</Tag>)}
        <CollapsibleContent className="flex flex-wrap gap-2">
          {lastGenres.length > 0 &&
            lastGenres.map((genre, index) => <Tag key={index}>{genre.genre.name}</Tag>)}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
