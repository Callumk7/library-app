"use client";

import { Button } from "@/components/ui/button";
import { Home } from "@/components/ui/icons/Home";
import { PlayOutline } from "@/components/ui/icons/PlayOutline";
import { SearchIcon } from "@/components/ui/icons/Search";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CollectionNavbarProps {
  userId: string;
  genres: string[];
}

export function CollectionNavbar({ userId }: CollectionNavbarProps) {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <div>
      <div className="mb-5 flex flex-row space-x-3 align-middle">
        <Button
          asChild
          variant={pathName === `/collection/${userId}` ? "secondary" : "ghost"}
          size={"sm"}
        >
          <Link href={`/collection/${userId}`}>
            <Home className="mr-2" />
            <span>Collection</span>
          </Link>
        </Button>
        <Button
          asChild
          variant={
            pathName.startsWith(`/collection/${userId}/playlists`) ? "secondary" : "ghost"
          }
          size={"sm"}
        >
          <Link href={`/collection/${userId}/playlists`}>
            <PlayOutline className="mr-2" />
            <span>Playlists</span>
          </Link>
        </Button>
        <Button
          asChild
          variant={
            pathName.startsWith(`/collection/search`) ? "secondary" : "ghost"
          }
          size={"sm"}
        >
          <Link href={`/collection/search`}>
            <SearchIcon className="mr-2" />
            <span>Find Games</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
