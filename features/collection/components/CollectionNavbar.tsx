"use client";

import { Button } from "@/components/ui/button";
import { Home } from "@/components/ui/icons/Home";
import { PlayOutline } from "@/components/ui/icons/PlayOutline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CollectionNavbar({ userId }: { userId: string }) {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <div className="flex flex-row space-x-3 align-middle mb-5">
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
    </div>
  );
}
