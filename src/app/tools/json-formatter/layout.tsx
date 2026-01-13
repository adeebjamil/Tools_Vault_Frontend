import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - ToolsVault",
  description: "Beautify, minify, and validate JSON data. Syntax highlighting and error detection. A free tool to make life easier for developers.",
  keywords: ["json formatter", "json validator", "beautify json", "json minify", "json lint", "json viewer"],
  openGraph: {
    title: "JSON Formatter & Validator - ToolsVault",
    description: "Format and validate JSON instantly. Free, secure, and run locally in your browser.",
    url: "https://tools-vault.app/tools/json-formatter",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
