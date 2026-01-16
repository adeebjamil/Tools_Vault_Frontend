import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text to SVG Generator - ToolsVault",
  description: "Convert text to high-quality SVG vector graphics. Customize fonts, colors, and strokes for logos and designs.",
  keywords: ["text to svg", "svg generator", "vector text", "font to svg", "google fonts svg"],
  openGraph: {
    title: "Text to SVG Generator - ToolsVault",
    description: "Create SVG text instantly. Free and customizable.",
    url: "https://tools-vault.app/tools/text-to-svg",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
