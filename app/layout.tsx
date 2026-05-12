import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const APP_URL = "https://holtzdigitalui.com";
const SITE_NAME = "HoltzDigitalUI";
const DEFAULT_DESCRIPTION =
  "The premier marketplace for Tailwind CSS templates, UI kits, and icon sets. Buy and sell premium digital products built with Tailwind CSS.";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${SITE_NAME} — Tailwind CSS Templates, UI Kits & Icons`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Tailwind CSS templates",
    "Tailwind UI kits",
    "Tailwind icons",
    "buy Tailwind components",
    "sell Tailwind templates",
    "digital marketplace",
    "UI components",
    "Next.js templates",
  ],
  authors: [{ name: "HoltzDigital", url: APP_URL }],
  creator: "HoltzDigital",
  publisher: "HoltzDigital",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Tailwind CSS Templates, UI Kits & Icons`,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Tailwind CSS Templates, UI Kits & Icons`,
    description: DEFAULT_DESCRIPTION,
    creator: "@holtzdigitalui",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: APP_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Navbar />
        {children}
        <footer className="border-t mt-auto py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center gap-4 text-sm text-muted-foreground">
            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
              <p>© {new Date().getFullYear()} HoltzDigitalUI — a product of <a href="https://holtzdigital.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">HoltzDigital</a>. All rights reserved.</p>
              <div className="flex flex-wrap justify-center sm:justify-end gap-4">
                <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
                <a href="/refunds" className="hover:text-foreground transition-colors">Refund Policy</a>
                <a href="/dmca" className="hover:text-foreground transition-colors">DMCA</a>
              </div>
            </div>
            <a href="mailto:support@holtzdigitalui.com" className="hover:text-foreground transition-colors">support@holtzdigitalui.com</a>
          </div>
        </footer>
        <Toaster richColors theme="light" closeButton />
      </body>
    </html>
  );
}
