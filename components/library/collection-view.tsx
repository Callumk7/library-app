import { GameWithCover } from "@/types";
import CollectionItem from "./collection-item";

interface CollectionViewProps {
  content: GameWithCover[];
}
export function CollectionView({ content }: CollectionViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      {content.map((item, index) => (
        <CollectionItem key={index} item={item} />
      ))}
    </div>
  );
}
