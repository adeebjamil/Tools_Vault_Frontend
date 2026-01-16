import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown to PDF Converter - ToolsVault",
  description: "Convert Markdown to PDF documents online. Clean layout, printable formatting.",
  keywords: ["markdown to pdf", "md to pdf", "pdf converter", "markdown export"],
  openGraph: {
    title: "Markdown to PDF Converter - ToolsVault",
    description: "Turn Markdown into professional PDFs instantly.",
    url: "https://tools-vault.app/tools/markdown-to-pdf",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
