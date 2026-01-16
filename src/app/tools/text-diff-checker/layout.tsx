import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Diff Checker - ToolsVault",
  description: "Compare two text files and highlight the differences. Support for character, word, and line diffs.",
  keywords: ["text diff", "diff checker", "compare text", "find differences", "code compare"],
  openGraph: {
    title: "Text Diff Checker - ToolsVault",
    description: "Compare text differences online. Highlight changes instantly.",
    url: "https://tools-vault.app/tools/text-diff-checker",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
