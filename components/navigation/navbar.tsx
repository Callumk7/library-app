import Link from "next/link";
import Searchbar from "./searchbar";
import { UserButton, SignedIn, SignedOut, SignInButton, auth } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default async function Navbar() {
  const { userId } = auth();
  return (
    <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm text-foreground">
        <div className="flex flex-row items-center space-x-6">
          <Searchbar />
          <Button asChild variant={"outline"}>
            <Link href={`/collection/${userId}`}>My Collection</Link>
          </Button>
        </div>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
}
