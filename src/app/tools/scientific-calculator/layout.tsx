import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scientific Calculator - ToolsVault",
  description: "Advanced scientific calculator online. Supports trigonometry, logarithms, exponentials, and equation history.",
  keywords: ["scientific calculator", "online calculator", "math calculator", "trigonometry calculator", "logarithm calculator"],
  openGraph: {
    title: "Scientific Calculator - ToolsVault",
    description: "Solve complex math problems instantly.",
    url: "https://tools-vault.app/tools/scientific-calculator",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
