import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator - ToolsVault",
  description: "Generate unique UUIDs (v1, v4) instantly. Bulk generation support. A free developer tool to make life easier.",
  keywords: ["uuid generator", "guid generator", "random uuid", "uuid v4", "bulk uuid generator"],
  openGraph: {
    title: "UUID Generator - ToolsVault",
    description: "Generate unique identifiers (UUIDs) instantly. Bulk generation available.",
    url: "https://tools-vault.app/tools/uuid-generator",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
