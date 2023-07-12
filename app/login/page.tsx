"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("sign-in");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setView("check-email");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push("/");
    router.refresh();
  };

  return (
    <div>
      <Link href="/">Back</Link>
      {view === "check-email" ? (
        <p>Check {email} to continue signing up</p>
      ) : (
        <form onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}>
          <label htmlFor="email">Email</label>
          <input
            className="text-red-500"
            name="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            className="text-red-500"
            name="password"
            type="password"
            value={password}
            placeholder="***********"
            onChange={(e) => setPassword(e.target.value)}
          />
          {view === "sign-in" && (
            <>
              <button>Sign In</button>
              <p>
                Need an account?
                <button onClick={() => setView("sign-up")}>Sign Up Now</button>
              </p>
            </>
          )}
          {view === "sign-up" && (
            <>
              <button>Sign Up</button>
              <p>
                Already have an account?
                <button onClick={() => setView("sign-in")}>Sign in now</button>
              </p>
            </>
          )}
        </form>
      )}
    </div>
  );
}
