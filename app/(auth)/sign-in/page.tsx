
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { SignIn } from "@/features/auth/components/SignIn";
import { getProviders, signIn } from "next-auth/react";

export default async function SignInPage() {
  const providers = await getProviders() ?? [];
  return (
    <SignIn providers={providers} />
  );
}
