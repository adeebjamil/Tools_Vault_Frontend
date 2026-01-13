import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Generator & Decoder - ToolsVault",
  description: "Generate and decode JSON Web Tokens (JWT). Debug and verify JWT signatures. A free security tool to make life easier.",
  keywords: ["jwt generator", "jwt decoder", "json web token", "jwt debugger", "jwt verifier"],
  openGraph: {
    title: "JWT Generator & Decoder - ToolsVault",
    description: "Debug and generate JSON Web Tokens. Secure and client-side.",
    url: "https://tools-vault.app/tools/jwt-generator",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
