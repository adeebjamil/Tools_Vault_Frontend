import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "ToolsVault - Free Tools to Make Life Easier",
    template: "%s | ToolsVault",
  },
  description:
    "ToolsVault offers different free tools which help make life easier in every category. From developer utilities to content creation aids, access a wide range of secure, client-side tools with no sign-up required.",
  keywords: [
    "free online tools",
    "developer tools",
    "utility tools",
    "productivity tools",
    "JSON formatter",
    "word counter",
    "QR code generator",
    "image compressor",
    "make life easier",
    "ToolsVault",
  ],
  authors: [{ name: "ToolsVault" }],
  creator: "ToolsVault",
  metadataBase: new URL("https://tools-vault.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tools-vault.app",
    siteName: "ToolsVault",
    title: "ToolsVault - Free Tools to Make Life Easier",
    description:
      "ToolsVault offers different free tools which help make life easier in every category. Fast, secure, and always free.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolsVault - Free Tools to Make Life Easier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolsVault - Free Tools to Make Life Easier",
    description:
      "ToolsVault offers different free tools which help make life easier in every category. Fast, secure, and always free.",
    images: ["/og-image.png"],
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
};

import Script from "next/script";
import CookieConsent from "@/components/ui/CookieConsent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} antialiased min-h-screen bg-slate-950 text-white`} suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PV693NH7XE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-PV693NH7XE');
          `}
        </Script>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
