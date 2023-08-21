"use client";

import { queryClient } from "@/lib/db/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./ui/toast";
import { TooltipProvider } from "./ui/tooltip";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
