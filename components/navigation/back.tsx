"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function Back() {
  const router = useRouter();
  return (
    <Button className="absolute top-24 left-8 text-foreground/40 hover:text-foreground" variant={"outline"} size={"sm"} onClick={() => router.back()}>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11h12Z"
        />
      </svg>
    </Button>
  );
}
