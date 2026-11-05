import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Belgotex | South Africa's Leading Carpet & Flooring Manufacturer",
  description:
    "Belgotex crafts premium carpets, vinyl, rugs, carpet tiles and artificial grass for homes and commercial spaces across Africa. See what a 1000x faster, modern Belgotex could feel like.",
  keywords: [
    "Belgotex",
    "carpet",
    "vinyl flooring",
    "carpet tiles",
    "rugs",
    "artificial grass",
    "South Africa flooring",
    "commercial flooring",
    "B2B lead generation",
  ],
  authors: [{ name: "Belgotex Demo" }],
  openGraph: {
    title: "Belgotex — Reimagined",
    description:
      "A 1000x faster, accessible, modern demo of what Belgotex could be. Built by Hustle Portal.",
    url: "https://belgotex-demo.vercel.app",
    siteName: "Belgotex Demo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Belgotex — Reimagined",
    description:
      "A 1000x faster, accessible, modern demo of what Belgotex could be.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
