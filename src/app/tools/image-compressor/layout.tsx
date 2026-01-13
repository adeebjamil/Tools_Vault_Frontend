import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Compressor - ToolsVault",
  description: "Compress JPEG, PNG, and WebP images online for free. Reduce file size without losing quality. A specialized tool from ToolsVault to make life easier for developers and designers.",
  keywords: ["image compressor", "compress jpeg", "compress png", "webp converter", "reduce image size", "free image tool"],
  openGraph: {
    title: "Image Compressor - ToolsVault",
    description: "Compress images locally in your browser. Fast, private, and free.",
    url: "https://tools-vault.app/tools/image-compressor",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
