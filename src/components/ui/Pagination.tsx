
"use client";

import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    // Always show first page
    pages.push(1);

    // Logic for ellipsis and middle pages
    if (totalPages <= 5) {
        for (let i = 2; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // Complex logic for many pages
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);
        
        if (currentPage <= 3) {
            end = 4;
        }
        if (currentPage >= totalPages - 2) {
            start = totalPages - 3;
        }

        if (start > 2) {
            pages.push("...");
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) {
            pages.push("...");
        }

        // Always show last page
        if (totalPages > 1) {
             pages.push(totalPages);
        }
    }
    
    // Sort and unique just in case logic slips (filtering non-numbers/ellipses) or simple duplicate avoidance
    // But manual logic above is generally fine. 
    // Actually, let's keep it simple: 
    // If we have "..." it's a string, so strict types might be annoying in array.
    // Let's rely on the logic above being correct.
    return pages;
  };

  const pages = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <div className={`flex justify-center items-center gap-2 mt-12 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white hover:border-blue-500/50 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <span className="sr-only">Previous</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pages.map((page, index) => {
          const isEllipsis = page === "...";
          const isCurrent = page === currentPage;
          
          if (isEllipsis) {
            return (
              <span key={`ellipsis-${index}`} className="text-neutral-600 px-2 select-none">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`
                w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300
                ${isCurrent 
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 scale-105" 
                  : "bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white hover:border-blue-500/30 hover:bg-neutral-800"
                }
              `}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white hover:border-blue-500/50 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <span className="sr-only">Next</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
