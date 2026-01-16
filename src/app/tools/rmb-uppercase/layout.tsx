import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RMB Uppercase Converter - ToolsVault",
  description: "Convert numbers to Chinese uppercase amounts (RMB) for invoices and financial documents.",
  keywords: ["rmb converter", "chinese number converter", "RMB uppercase", "chinese currency", "financial text"],
  openGraph: {
    title: "RMB Uppercase Converter - ToolsVault",
    description: "Convert numbers to RMB uppercase instantly.",
    url: "https://tools-vault.app/tools/rmb-uppercase",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
