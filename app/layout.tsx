import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { TooltipProvider } from "@/components/ui/tooltip";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const notoSansEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bunamahber",
  description: "Buna Mahber is a community for coffee lovers to connect, share their experiences, and learn about coffee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          bricolageGrotesque.variable,
          instrumentSans.variable,
          notoSansEthiopic.variable,
          "antialiased"
        )}
      >
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
