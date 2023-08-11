import Navbar from "@/components/navigation/navbar";
import "./globals.css";
import { Back } from "@/components/navigation/back";
import { Providers } from "@/components/providers";
import { ToastViewport } from "@/components/ui/toast";

export const metadata = {
  title: "playQ",
  description: "Keep track of what you are playing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className="flex min-h-screen flex-col items-center bg-background text-foreground">
          <Navbar />
          {children}
          <ToastViewport />
        </body>
      </html>
    </Providers>
  );
}
