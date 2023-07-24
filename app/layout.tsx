import Navbar from "@/components/navigation/navbar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";

export const metadata = {
  title: "Playlister",
  description: "Keep track of what you are playing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <ToastProvider>
          <body className="flex min-h-screen flex-col items-center bg-background text-foreground">
            <Navbar />
            {children}
            <ToastViewport />
          </body>
        </ToastProvider>
      </html>
    </ClerkProvider>
  );
}
