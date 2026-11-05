import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Belgotex | Floors That Inspire You",
  description:
    "Belgotex is Africa's leading carpet and artificial grass manufacturer. For over 40 years we have crafted broadloom carpets, carpet tiles, luxury vinyl and rugs that bring together thoughtful design, technical performance and a deep respect for people and the planet.",
  keywords: [
    "Belgotex",
    "carpet",
    "carpet tiles",
    "vinyl flooring",
    "luxury vinyl tile",
    "rugs",
    "artificial grass",
    "broadloom",
    "South Africa flooring",
    "commercial flooring",
    "soft flooring",
    "Stainproof Miracle Fibre",
  ],
  authors: [{ name: "Belgotex" }],
  openGraph: {
    title: "Belgotex | Floors That Inspire You",
    description:
      "Africa's leading carpet and artificial grass manufacturer. Over 40 years of flooring craft.",
    url: "https://www.belgotex.co.za/",
    siteName: "Belgotex",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Belgotex | Floors That Inspire You",
    description:
      "Africa's leading carpet and artificial grass manufacturer.",
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
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
