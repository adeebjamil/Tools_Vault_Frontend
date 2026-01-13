import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator - ToolsVault",
  description: "Create custom QR codes for URLs, text, WiFi, and more. Download as PNG or SVG. Free QR code generator to make life easier.",
  keywords: ["qr code generator", "create qr code", "qr code maker", "free qr code", "qr code creator"],
  openGraph: {
    title: "QR Code Generator - ToolsVault",
    description: "Generate styled QR codes instantly. Free and customizable.",
    url: "https://tools-vault.app/tools/qr-code-generator",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
