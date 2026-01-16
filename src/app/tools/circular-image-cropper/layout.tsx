import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Circular Image Cropper - ToolsVault",
  description: "Crop images into perfect circles online. Free, fast, and secure tool to create circular profile pictures and avatars.",
  keywords: ["circular image cropper", "circle cropper", "profile picture maker", "round image crop", "avatar creator"],
  openGraph: {
    title: "Circular Image Cropper - ToolsVault",
    description: "Create circular images instantly. No upload to server required.",
    url: "https://tools-vault.app/tools/circular-image-cropper",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
