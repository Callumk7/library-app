import { IGDBGame } from "@/types";
import { ExternalGameCardCover } from "./ExternalGameCardCover";

type ControlComponentType<P extends object> = (
  props: P & { game: IGDBGame }
) => JSX.Element;

interface ExternalCoverViewProps<P extends object, T extends IGDBGame> {
  games: T[];
  ControlComponent: ControlComponentType<P>;
  controlProps: P;
  selectedGames: number[];
}
export function ExternalCoverView<P extends object, T extends IGDBGame>({
  games,
  ControlComponent,
  controlProps,
  selectedGames,
}: ExternalCoverViewProps<P, T>) {
  if (games.length === 0) {
    return <div className="text-4xl w-full text-center">🫠</div>
  }
  return (
    <div className="mx-auto grid w-4/5 grid-cols-2 gap-4 md:w-full md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {games.map((game) => (
        <ExternalGameCardCover
          key={game.id}
          game={game}
          isSelected={selectedGames.includes(game.id)}
        >
          <ControlComponent
            game={game}
            {...controlProps}
          />
        </ExternalGameCardCover>
      ))}
    </div>
  );
}
