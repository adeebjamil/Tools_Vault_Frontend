import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter - ToolsVault",
  description: "Convert Unix timestamps to human-readable dates and vice versa. Support for seconds, milliseconds, and microseconds.",
  keywords: ["timestamp converter", "unix time", "epoch converter", "date to timestamp", "timestamp to date"],
  openGraph: {
    title: "Unix Timestamp Converter - ToolsVault",
    description: "Convert Unix timestamps instantly.",
    url: "https://tools-vault.app/tools/timestamp-converter",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
