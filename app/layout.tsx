import Navbar from "@/components/navigation/navbar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Providers from "@/lib/jotai/providers";

export const metadata = {
  title: "Culture Collector",
  description: "Keep track of what you are playing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <Providers>
          <body className="flex min-h-screen flex-col items-center bg-background text-foreground">
            <Navbar />
            {children}
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}
