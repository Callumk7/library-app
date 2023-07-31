import { ToastProvider } from "./ui/toast";
import { ReactNode } from "react";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <ToastProvider>{children}</ToastProvider>
    </ClerkProvider>
  );
}
