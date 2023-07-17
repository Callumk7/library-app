import { Game, GameWithCover, IGDBGame } from "@/types";
import { LibraryItem } from "./library-item";
import Image from "next/image";

interface LibraryViewProps {
  content: IGDBGame[];
}

export function LibraryView({ content }: LibraryViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      {content.map((item, index) => (
        <LibraryItem key={index} item={item} />
      ))}
    </div>
  );
}
