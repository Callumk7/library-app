import { GameWithCover } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface CollectionItemProps {
  item: GameWithCover;
  handleRemove: (itemId: number) => void;
}

export default function CollectionItem({ item, handleRemove }: CollectionItemProps) {
  const handleClick = () => {
    handleRemove(item.externalId);
  };

  const size = "720p";

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg border text-foreground hover:border-foreground">
      <Link href={`/collection/${item.externalId}`}>
        <Image
          src={`https://images.igdb.com/igdb/image/upload/t_${size}/${item.cover?.imageId}.jpg`}
          alt="cover image"
          width={720}
          height={1280}
        />
      </Link>
      <div className="p-6">
        <h1 className="mb-2 min-h-[40px]  font-bold lg:min-h-[60px]">{item.title}</h1>
      </div>
      <Button onClick={handleClick} className="absolute bottom-4 right-4">
        Remove
      </Button>
    </div>
  );
}
