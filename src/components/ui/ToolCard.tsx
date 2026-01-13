import Link from "next/link";
import Image from "next/image";

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  href: string;
}

export default function ToolCard({ title, description, image, category, href }: ToolCardProps) {
  return (
    <Link href={href} className="group block">
      {/* Desktop: Vertical Card Layout */}
      <div className="hidden sm:block card h-full overflow-hidden">
        {/* Tool Image */}
        <div className="relative h-40 -mx-6 -mt-6 mb-5 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
          <span className="absolute bottom-3 left-4 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-gray-300 border border-slate-700">
            {category}
          </span>
        </div>
        
        {/* Content */}
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>
        
        {/* Footer */}
        <div className="mt-5 pt-5 border-t border-slate-800 flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300">
          Use Tool
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Mobile: Horizontal Card Layout */}
      <div className="sm:hidden flex items-stretch rounded-xl bg-slate-900/50 border border-slate-800 overflow-hidden group-hover:border-blue-500/30 transition-all">
        {/* Tool Image */}
        <div className="relative w-28 shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/40" />
        </div>
        
        {/* Content */}
        <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                {title}
              </h3>
              <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-gray-400">
                {category}
              </span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
          </div>
          
          {/* Footer */}
          <div className="mt-2 flex items-center text-xs font-medium text-blue-400">
            Use Tool
            <svg
              className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
