"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function UserProfile() {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <div className="flex flex-row place-items-center justify-center space-x-4 align-middle">
        <p> signed in as {session.user?.name}</p>
        <Button variant={"ghost"} size={"sm"} asChild>
          <Link href="/api/auth/signout">Sign out</Link>
        </Button>
      </div>
    );
  }
}
