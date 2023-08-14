import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { ClientProviders } from "./providers.client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <ClientProviders>{children}</ClientProviders>
    </ClerkProvider>
  );
}
