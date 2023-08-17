import Link from "next/link";
import Searchbar from "./searchbar";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm text-foreground">
        <div className="flex flex-row items-center space-x-6">
          <Button asChild variant={"default"}>
            <Link href={`/collection/`}>My Collection</Link>
          </Button>
          <Searchbar />
        </div>
      </div>
    </nav>
  );
}
