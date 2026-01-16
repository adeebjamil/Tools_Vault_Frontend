import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator - ToolsVault",
  description: "Calculate how your savings grow over time with compound interest. Visualize your investment growth with interactive charts.",
  keywords: ["compound interest calculator", "investment calculator", "savings growth", "finance tool", "interest calculator"],
  openGraph: {
    title: "Compound Interest Calculator - ToolsVault",
    description: "Visualize your savings growth with our free compound interest calculator.",
    url: "https://tools-vault.app/tools/compound-interest-calculator",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
