import Link from "next/link";
import { cookies } from "next/headers";
import Searchbar from "./searchbar";
import { UserButton } from "@clerk/nextjs";

export default async function Navbar() {
  return (
    <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm text-foreground">
        <Searchbar />
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
