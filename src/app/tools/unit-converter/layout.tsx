import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter - ToolsVault",
  description: "Convert between common units of measurement: Length, Weight, Temperature, Area, Speed, and Time.",
  keywords: ["unit converter", "measurement converter", "metric converter", "imperial converter", "online converter"],
  openGraph: {
    title: "Unit Converter - ToolsVault",
    description: "Convert any unit instantly. Free online tool.",
    url: "https://tools-vault.app/tools/unit-converter",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
