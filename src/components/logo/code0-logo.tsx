"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

interface Code0LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Code0Logo: React.FC<Code0LogoProps> = ({
  className,
  size = "md",
}) => {
  const iconSizes = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 group cursor-pointer",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-zinc-700/80 shadow-lg shadow-orange-950/30 group-hover:border-orange-500/50 transition-all duration-300",
          iconSizes[size],
        )}
      >
        {/* Glow backdrop */}
        <div className="absolute inset-0 rounded-xl bg-orange-500/10 blur-sm group-hover:bg-orange-500/20 transition-all" />

        <span className="font-mono font-black tracking-tighter text-white z-10 flex items-center">
          &lt;<span className="text-orange-500">0</span>&gt;
        </span>

        {/* Pulsing online status dot */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
        </span>
      </div>

      <div className="flex flex-col">
        <span
          className={cn(
            "font-bold tracking-tight text-white font-mono flex items-center gap-1",
            textSizes[size],
          )}
        >
          code<span className="text-orange-500 font-extrabold">0</span>
          <span className="px-1.5 py-0.2 text-[10px] uppercase font-sans tracking-wider font-semibold rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
            AI
          </span>
        </span>
      </div>
    </div>
  );
};
