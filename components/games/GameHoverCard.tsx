"use client";

import { GameWithCoverAndGenres } from "@/types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover";
import { Tag } from "../ui/tag";
import { InCollectionTag } from "./InCollectionTag";
import { ScrollArea } from "../ui/scroll-area";
import { RatingLine } from "./Rating";
import { Label } from "../ui/label";

interface GameHoverCardProps {
  game: GameWithCoverAndGenres;
  children: React.ReactNode;
}
export function GameHoverCard({ game, children }: GameHoverCardProps) {
  // get game playlists and display them..

  return (
    <HoverCard openDelay={1500} closeDelay={100}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent side="right" sideOffset={12}>
        <div className="flex flex-col space-y-2">
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
          <div id="rating">
            <RatingLine
              percent={game.aggregatedRating!}
              strokeColor="#ffffff"
              strokeWidth={2}
              trailColor="#000000"
            />
          </div>
          <Label htmlFor="rating">Rating</Label>
          {game.storyline && (
            <ScrollArea className="h-80 w-full">
              <p className="text-sm">{game.storyline}</p>
            </ScrollArea>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
