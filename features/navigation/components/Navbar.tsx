"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserProfile } from "./UserProfile";
import { Playlist } from "@/components/ui/icons/Playlist";
import { Home } from "@/components/ui/icons/Home";
import { usePathname } from "next/navigation";
import { FriendsIcon } from "@/components/ui/icons/Friends";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const pathName = usePathname();
  const { data, status } = useSession();
  const userId = data?.user.id;
  return (
    <nav className="flex w-full justify-between rounded-md border px-6">
      <div className="mx-auto flex w-full items-center justify-between px-4 py-3 text-sm text-foreground">
        <div className="flex flex-row space-x-3 align-middle">
          <Button asChild variant={pathName === "/" ? "secondary" : "ghost"} size={"sm"}>
            <Link href={`/`}>
              <Home className="mr-2" />
              <span>Home</span>
            </Link>
          </Button>
          <Button
            asChild
            variant={pathName.startsWith("/collection") ? "secondary" : "ghost"}
            size={"sm"}
          >
            <Link href={`/collection/${userId}`}>
              <Playlist className="mr-2" />
              <span>My Collection</span>
            </Link>
          </Button>
          <Button
            asChild
            variant={pathName.startsWith("/friends") ? "secondary" : "ghost"}
            size={"sm"}
          >
            <Link href={`/friends/${userId}`}>
              <FriendsIcon className="mr-2" />
              <span>Friends</span>
            </Link>
          </Button>
        </div>
        <UserProfile />
      </div>
    </nav>
  );
}
