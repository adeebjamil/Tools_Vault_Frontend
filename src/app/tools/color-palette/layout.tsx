import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Generator - ToolsVault",
  description: "Generate harmonious color schemes and palettes. Complementary, analogous, and more. A free design tool to make life easier.",
  keywords: ["color palette generator", "color scheme", "color wheel", "palette maker", "design tools", "color combinations"],
  openGraph: {
    title: "Color Palette Generator - ToolsVault",
    description: "Create beautiful color palettes for your projects. Free and easy to use.",
    url: "https://tools-vault.app/tools/color-palette",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
