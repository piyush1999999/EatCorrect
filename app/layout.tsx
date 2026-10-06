import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "EatCorrect — Eat Better. Choose Correct.",
    template: "%s · EatCorrect",
  },
  description:
    "EatCorrect is a modern food & grocery platform to discover, evaluate and buy better-quality food. Fresh, quality food delivered to your door.",
  applicationName: "EatCorrect",
  keywords: ["groceries", "healthy food", "fresh produce", "paneer", "organic", "EatCorrect"],
  openGraph: {
    title: "EatCorrect — Eat Better. Choose Correct.",
    description: "Fresh, quality food delivered to your door.",
    siteName: "EatCorrect",
    type: "website",
  },
  icons: { icon: "/assets/eatcorrect-logo.svg" },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "EatCorrect", statusBarStyle: "default" },
  metadataBase: new URL("https://eatcorrect.example.com"),
};

export const viewport: Viewport = {
  themeColor: "#1a7f4b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <AppProviders>
          <Header />
          <main className="min-h-[70vh] pb-24 md:pb-10">{children}</main>
          <BottomNav />
        </AppProviders>
      </body>
    </html>
  );
}
