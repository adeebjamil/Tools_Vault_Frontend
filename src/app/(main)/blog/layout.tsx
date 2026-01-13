import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - ToolsVault | Developer Tutorials & Insights",
  description: "Read the latest articles, tutorials, and insights from ToolsVault. Learn about web development, productivity, and how to make life easier with our free tools.",
  keywords: ["developer blog", "web development tutorials", "coding insights", "productivity tips", "tech blog", "free tools guide"],
  openGraph: {
    title: "Blog - ToolsVault",
    description: "Insights and tutorials for developers. Learn how to use our free tools to make life easier.",
    url: "https://tools-vault.app/blog",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
