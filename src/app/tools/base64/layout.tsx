import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder - ToolsVault",
  description: "Encode text and files to Base64 or decode Base64 strings. Simple, fast, and secure. A free utility to make life easier.",
  keywords: ["base64 encoder", "base64 decoder", "base64 converter", "encode base64", "decode base64"],
  openGraph: {
    title: "Base64 Encoder & Decoder - ToolsVault",
    description: "Convert text and files to Base64 instantly. Free and secure.",
    url: "https://tools-vault.app/tools/base64",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
