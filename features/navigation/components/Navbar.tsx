"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { UserProfile } from "./UserProfile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <nav className="flex h-16 w-full justify-center border">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm text-foreground">
        <div className="flex flex-row items-center space-x-6">
          <Button asChild variant={"ghost"} size={"sm"}>
            <Link href={`/`}>Home</Link>
          </Button>
          <Button asChild variant={"default"} size={"sm"}>
            <Link href={`/collection`}>My Collection</Link>
          </Button>
          <Searchbar />
          <UserProfile />
        </div>
      </div>
    </nav>
  );
}
