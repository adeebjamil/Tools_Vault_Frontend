import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Small Text Generator - ToolsVault",
  description: "Generate tiny text, superscript, and subscript for social media bios (Instagram, Twitter, TikTok).",
  keywords: ["small text", "tiny text generator", "superscript generator", "subscript text", "unicode text"],
  openGraph: {
    title: "Small Text Generator - ToolsVault",
    description: "Make your text tiny instantly. Perfect for social bios.",
    url: "https://tools-vault.app/tools/small-text-generator",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
