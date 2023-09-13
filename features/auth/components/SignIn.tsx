"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { getProviders, signIn } from "next-auth/react";

export function SignIn({providers}) {
  return (
    <div className="mx-auto w-1/3">
      <form className="mx-auto my-10 flex w-2/3 flex-col gap-4">
        <div className="flex w-full flex-col place-items-center justify-items-stretch space-y-2">
          <Label className="min-w-fit place-self-start pl-1" htmlFor="email">
            Email Address
          </Label>
          <Input className="w-full" placeholder="email" id="email" />
        </div>

        <div className="flex w-full flex-col place-items-center justify-items-stretch space-y-2">
          <Label className="min-w-fit place-self-start pl-1" htmlFor="password">
            Password
          </Label>
          <Input className="w-full" placeholder="password" id="password" />
        </div>

        <div className="mt-5 flex w-full flex-row gap-4">
          {Object.values(providers).map((provider) => (
            <Button key={provider.id} onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </Button> 
          ))}
        </div>
      </form>
    </div>
  );
}
