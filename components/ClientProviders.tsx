"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./ui/toast";
import { TooltipProvider } from "./ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "@/lib/clients/react-query";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ToastProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
