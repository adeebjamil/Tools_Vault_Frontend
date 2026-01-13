import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown Editor & Preview - ToolsVault",
  description: "Real-time Markdown editor with live preview. Write and export Markdown easily. A free tool for writers and developers to make life easier.",
  keywords: ["markdown editor", "markdown preview", "markdown to html", "online markdown", "markdown cheat sheet"],
  openGraph: {
    title: "Markdown Editor & Preview - ToolsVault",
    description: "Write and preview Markdown in real-time. Export to HTML instantly.",
    url: "https://tools-vault.app/tools/markdown-preview",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
