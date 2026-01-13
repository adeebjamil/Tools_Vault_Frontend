import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hash Generator - ToolsVault",
  description: "Generate MD5, SHA-1, SHA-256 hashes from text. Secure and client-side. A free cryptography tool to make life easier.",
  keywords: ["hash generator", "md5 generator", "sha256 generator", "hash calculator", "checksum generator"],
  openGraph: {
    title: "Hash Generator - ToolsVault",
    description: "Generate secure hashes instantly. Supports MD5, SHA1, SHA256 and more.",
    url: "https://tools-vault.app/tools/hash-generator",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
