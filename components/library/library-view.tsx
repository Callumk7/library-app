import { GameWithGenreAndCover, IGDBGame } from "@/types";
import { Game } from "@prisma/client";

interface LibraryViewProps {
  content: IGDBGame[];
}

interface LibraryItemProps {
  item: IGDBGame;
}

export default function LibraryView({ content }: LibraryViewProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {content.map((item, index) => (
        <LibraryItem key={index} item={item} />
      ))}
    </div>
  );
}

function LibraryItem({ item }: LibraryItemProps) {
  return (
    <div className="rounded-md border border-white px-2 py-4">
      <h1 className="text-red-500">{item.name}</h1>
      {item.genres && <p className="text-slate-400">{item.genres[0].name}</p>}
    </div>
  );
}
