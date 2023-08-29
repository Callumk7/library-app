"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { UserProfile } from "./UserProfile";

export default function Navbar() {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  return (
    <nav className="flex h-16 w-full justify-center border">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm text-foreground">
        <div className="flex flex-row items-center space-x-6">
          <Button asChild variant={"ghost"} size={"sm"}>
            <Link href={`/`}>Home</Link>
          </Button>
          <Button asChild variant={"secondary"} size={"sm"}>
            <Link href={`/collection/${userId}`}>My Collection</Link>
          </Button>
          <Searchbar />
          <UserProfile />
        </div>
      </div>
    </nav>
  );
}
