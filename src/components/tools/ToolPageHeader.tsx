import Link from "next/link";

interface ToolPageHeaderProps {
  title: string;
  description: string;
  category: string;
  categoryColor?: string;
  icon: React.ReactNode;
}

export default function ToolPageHeader({
  title,
  description,
  category,
  categoryColor = "blue",
  icon,
}: ToolPageHeaderProps) {
  const colorClasses: Record<string, string> = {
    blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-400",
    purple: "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400",
    green: "from-green-500/10 to-emerald-500/10 border-green-500/20 text-green-400",
    orange: "from-orange-500/10 to-yellow-500/10 border-orange-500/20 text-orange-400",
    pink: "from-pink-500/10 to-rose-500/10 border-pink-500/20 text-pink-400",
    cyan: "from-cyan-500/10 to-teal-500/10 border-cyan-500/20 text-cyan-400",
  };

  return (
    <section className="relative pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm mb-4 sm:mb-6" aria-label="Breadcrumb">
          <Link href="/tools" className="text-gray-500 hover:text-white transition-colors">
            Tools
          </Link>
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-blue-400 truncate">{title}</span>
        </nav>

        {/* Header Content */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          {/* Icon Box */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0">
            {icon}
          </div>
          
          {/* Title & Description */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {title}
              </h1>
              <span className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-gradient-to-r ${colorClasses[categoryColor]} border`}>
                {category}
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-400 line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
