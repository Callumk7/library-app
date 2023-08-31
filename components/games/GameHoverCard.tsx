"use client";

import { GameWithCoverAndGenres } from "@/types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover";
import { Tag } from "../ui/tag";
import { InCollectionTag } from "./InCollectionTag";
import { ScrollArea } from "../ui/scroll-area";

interface GameHoverCardProps {
  game: GameWithCoverAndGenres;
  children: React.ReactNode;
}
export function GameHoverCard({ game, children }: GameHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent side="right" sideOffset={12}>
        <h1 className="text-xl font-semibold">{game.title}</h1>
        {game.releaseDate && (
          <p className="pb-3 text-sm text-foreground/80">
            {new Date(game.releaseDate * 1000).toDateString()}
          </p>
        )}
        <div className="flex flex-wrap gap-2 py-3">
          <InCollectionTag gameId={game.gameId} />
          {game.genres.map((genre) => (
            <Tag key={genre.genreId} variant={"secondary"}>
              {genre.genre.name}
            </Tag>
          ))}
        </div>
        <ScrollArea className="h-80 w-full">
            <p className="text-sm">{game.storyline}</p>
        </ScrollArea>
      </HoverCardContent>
    </HoverCard>
  );
}
