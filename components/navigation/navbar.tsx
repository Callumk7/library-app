"use client";

import { supabase } from "@/supabase/client";

export default async function NavBar() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="relative left-0 top-0 h-32 w-full bg-lime-200">
      {user ? <p>{user.email}</p> : <p>not signed in</p>}
    </div>
  );
}
