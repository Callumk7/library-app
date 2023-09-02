import { GameWithCoverAndGenres } from "@/types";
import { Separator } from "../ui/separator";
import { GameHoverCard } from "./GameHoverCard";
import { DragHandle } from "../ui/icons/DragHandle";

interface GameListEntryProps {
  game: GameWithCoverAndGenres;
  children: React.ReactNode;
}
export function GameListEntry({ game, children }: GameListEntryProps) {
  return (
    <div>
      <div className="relative flex w-full flex-row items-center justify-between rounded-md p-3 hover:bg-accent/60">
        <div className="flex flex-row space-x-2">
          <DragHandle className="h-6 w-6" />
          <GameHoverCard game={game}>
            <p className="cursor-pointer font-bold text-foreground">{game.title}</p>
          </GameHoverCard>
        </div>
        <div className="w-fit">{children}</div>
      </div>
      <Separator />
    </div>
  );
}
