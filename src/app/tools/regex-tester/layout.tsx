import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester & Debugger - ToolsVault",
  description: "Test and debug regular expressions (RegEx) in real-time. Highlight matches and errors. A free developer tool to make life easier.",
  keywords: ["regex tester", "regex debugger", "regular expression", "regex tool", "regex validator"],
  openGraph: {
    title: "Regex Tester & Debugger - ToolsVault",
    description: "Test your Regular Expressions in real-time. Free and easy to use.",
    url: "https://tools-vault.app/tools/regex-tester",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
