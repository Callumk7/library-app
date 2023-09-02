import { GameWithCoverAndGenres } from "@/types";
import { GameCardCover } from "./GameCardCover";

type ControlComponentType<P extends object> = (
  props: P & { game: GameWithCoverAndGenres }
) => JSX.Element;

interface CoverViewProps<P extends object, T extends GameWithCoverAndGenres> {
  games: T[];
  ControlComponent: ControlComponentType<P>;
  controlProps: P;
  selectedGames: number[];
}
export function CoverView<P extends object, T extends GameWithCoverAndGenres>({
  games,
  ControlComponent,
  controlProps,
  selectedGames,
}: CoverViewProps<P, T>) {
  return (
    <div className="mx-auto grid w-4/5 grid-cols-1 gap-4 md:w-full md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {games.map((game) => (
        <GameCardCover
          key={game.id}
          game={game}
          isSelected={selectedGames.includes(game.id)}
        >
          <ControlComponent
            game={game}
            {...controlProps}
          />
        </GameCardCover>
      ))}
    </div>
  );
}
