"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 bg-slate-950",
        className
      )}
    >
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5 mask-image:linear-gradient(to_bottom,transparent,black)" />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[60rem] h-[60rem] bg-blue-500/10 rounded-full blur-[10rem] opacity-50" />
        <div className="absolute top-[20%] left-[20%] w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[8rem] opacity-50" />
        <div className="absolute bottom-[20%] right-[20%] w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[8rem] opacity-50" />
      </div>
    </div>
  );
};
