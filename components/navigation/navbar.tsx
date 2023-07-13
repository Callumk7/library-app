import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import LogoutButton from "./login-button";
import Link from "next/link";
import { cookies } from "next/headers";
import Searchbar from "./searchbar";

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm text-foreground">
        <Searchbar />
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              Hey, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
