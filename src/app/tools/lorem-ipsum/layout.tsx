import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - ToolsVault",
  description: "Generate placeholder text for your designs. Paragraphs, sentences, or words. A free tool to make life easier for designers.",
  keywords: ["lorem ipsum generator", "dummy text", "placeholder text", "ipsum generator", "text generator"],
  openGraph: {
    title: "Lorem Ipsum Generator - ToolsVault",
    description: "Generate dummy text for your projects instantly. Free and customizable.",
    url: "https://tools-vault.app/tools/lorem-ipsum",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
