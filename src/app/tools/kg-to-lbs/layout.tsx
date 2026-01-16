import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KG to Lbs Converter - ToolsVault",
  description: "Instantly convert Kilograms (kg) to Pounds (lbs) and vice versa. Simple weight conversion tool.",
  keywords: ["kg to lbs", "kilograms to pounds", "weight converter", "kg converter", "lbs to kg"],
  openGraph: {
    title: "KG to Lbs Converter - ToolsVault",
    description: "Convert KG to Lbs instantly.",
    url: "https://tools-vault.app/tools/kg-to-lbs",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
