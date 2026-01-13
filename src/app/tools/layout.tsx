import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TurnstileGuard from "@/components/security/TurnstileGuard";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24">
        <TurnstileGuard>
          {children}
        </TurnstileGuard>
      </main>
      <Footer />
    </div>
  );
}
