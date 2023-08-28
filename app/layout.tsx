import { ClientProviders } from "@/components/ClientProviders";
import "./globals.css";
import { ToastViewport } from "@/components/ui/toast";
import Navbar from "@/features/navigation/components/Navbar";
import { inter, poppins } from "@/style/fonts";

export const metadata = {
  title: "playQ",
  description: "Keep track of what you are playing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
        <body className="flex min-h-screen flex-col items-center bg-background pt-3 text-foreground">
          <Navbar />
          {children}
          <ToastViewport />
        </body>
      </html>
    </ClientProviders>
  );
}
