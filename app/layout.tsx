import Navbar from "@/components/navigation/navbar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Culture Collector",
  description: "Keep track of what you are playing.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex min-h-screen flex-col items-center bg-background text-foreground">
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
