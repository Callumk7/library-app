import { ToastProvider } from "./ui/toast";
import { ReactNode } from "react";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "./ui/tooltip";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <ToastProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ToastProvider>
    </ClerkProvider>
  );
}
