import { IGDBGame } from "@/types";
import { LibraryItem } from "./LibraryItem";

interface LibraryViewProps {
  content: IGDBGame[];
}

export interface LibraryItemProps {
  item: IGDBGame;
}

export default function LibraryView({ content }: LibraryViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      {content.map((item, index) => (
        <LibraryItem key={index} item={item} />
      ))}
    </div>
  );
}


