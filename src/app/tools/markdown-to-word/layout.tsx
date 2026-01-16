import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown to Word Converter - ToolsVault",
  description: "Convert Markdown text to Microsoft Word (.docx) documents online. Preserve formatting, lists, and headers.",
  keywords: ["markdown to word", "md to docx", "convert markdown", "markdown converter", "document converter"],
  openGraph: {
    title: "Markdown to Word Converter - ToolsVault",
    description: "Convert Markdown to DOCX instantly for free.",
    url: "https://tools-vault.app/tools/markdown-to-word",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
