import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word & Character Counter - ToolsVault",
  description: "Free online word and character counter. Count words, sentences, paragraphs, and calculate reading time. Optimize your content with keyword density analysis. Part of ToolsVault's free tools to make life easier.",
  keywords: ["word counter", "character count", "sentence counter", "reading time", "keyword density", "text analysis", "free tool"],
  openGraph: {
    title: "Word & Character Counter - ToolsVault",
    description: "Count words, characters, and analyze text instantly. Free, secure, and client-side.",
    url: "https://tools-vault.app/tools/word-counter",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
