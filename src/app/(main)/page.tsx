import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import AboutSection from "@/components/home/AboutSection";
import ToolsSection from "@/components/home/ToolsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import UseCasesSection from "@/components/home/UseCasesSection";
import UpcomingSection from "@/components/home/UpcomingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-blue-500/30">
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ToolsSection />
      <FeaturesSection />
      <UseCasesSection />
      <UpcomingSection />
      <TestimonialsSection />
      <FAQSection />

      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </main>
  );
}
