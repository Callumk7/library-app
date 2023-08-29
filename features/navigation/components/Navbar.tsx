import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserProfile } from "./UserProfile";
import { Playlist } from "@/components/ui/icons/Playlist";
import { Home } from "@/components/ui/icons/Home";

export default function Navbar() {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  return (
    <nav className="flex h-16 w-full justify-between border">
      <div className="mx-auto flex w-4/5 items-center justify-between p-3 text-sm text-foreground">
        <div className="flex flex-row space-x-3 align-middle">
          <Button asChild variant={"ghost"} size={"sm"}>
            <Link href={`/`}>
              <Home className="mr-2" />
              <span>Home</span>
            </Link>
          </Button>
          <Button asChild variant={"ghost"} size={"sm"}>
            <Link href={`/collection/${userId}`}>
              <Playlist className="mr-2" />
              <span>My Collection</span>
            </Link>
          </Button>
        </div>
        <UserProfile />
      </div>
    </nav>
  );
}
