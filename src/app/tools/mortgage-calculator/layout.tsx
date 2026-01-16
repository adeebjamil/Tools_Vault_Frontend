import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator - ToolsVault",
  description: "Calculate monthly mortgage payments, total interest, and amortization. free mortgage calculator.",
  keywords: ["mortgage calculator", "loan calculator", "monthly payments", "home loan", "amortization"],
  openGraph: {
    title: "Mortgage Calculator - ToolsVault",
    description: "Calculate your mortgage payments instantly.",
    url: "https://tools-vault.app/tools/mortgage-calculator",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
