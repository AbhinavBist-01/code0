"use client";

import React from "react";
import {
  Sparkles,
  BarChart3,
  ShieldCheck,
  Flame,
  ArrowUpRight,
  Boxes,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

interface TemplateGridProps {
  onSelectTemplate?: (prompt: string) => void;
  className?: string;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  onSelectTemplate,
  className,
}) => {
  const templates = [
    {
      title: "SaaS Analytics Dashboard",
      category: "Dashboard",
      description:
        "Complete dark dashboard with revenue metrics, line chart, user table, and glass filters.",
      prompt:
        "Build a dark theme SaaS Analytics Dashboard with glass cards, line chart, activity feed, and metric cards.",
      icon: <BarChart3 className="h-5 w-5 text-orange-400" />,
      gradient: "from-orange-950/40 via-red-950/20 to-zinc-950",
    },
    {
      title: "Glassmorphic Auth Suite",
      category: "Authentication",
      description:
        "Modern login & sign-up forms with social buttons, passkey option, and red/orange glowing borders.",
      prompt:
        "Create a glassmorphic login & sign-up card suite with social buttons and glowing borders.",
      icon: <ShieldCheck className="h-5 w-5 text-red-400" />,
      gradient: "from-red-950/40 via-slate-950/20 to-zinc-950",
    },
    {
      title: "Dark Tiered Pricing",
      category: "Marketing",
      description:
        "3-tier responsive pricing cards with highlight plan, monthly/yearly toggle, and badge headers.",
      prompt:
        "Build a 3-tier dark mode pricing section with monthly/annual billing toggle and gradient highlight border.",
      icon: <Flame className="h-5 w-5 text-amber-400" />,
      gradient: "from-amber-950/40 via-slate-950/20 to-zinc-950",
    },
    {
      title: "AI Chat Assistant Hub",
      category: "AI Interfaces",
      description:
        "Conversational AI chat interface with message bubbles, prompt history sidebar, and code syntax blocks.",
      prompt:
        "Design an AI Chat Assistant UI with sidebar, message thread, code block formatting, and prompt input.",
      icon: <Sparkles className="h-5 w-5 text-orange-400" />,
      gradient: "from-orange-950/40 via-amber-950/20 to-zinc-950",
    },
  ];

  return (
    <div
      className={cn(
        "w-full max-w-6xl mx-auto space-y-6 z-10 relative",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Boxes className="h-5 w-5 text-orange-400" />
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Curated Component Templates
          </h2>
        </div>

        <span className="text-xs text-zinc-400 font-mono">
          Click any template to generate instantly
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl, idx) => (
          <div
            key={idx}
            onClick={() => onSelectTemplate?.(tpl.prompt)}
            className="group relative rounded-2xl glass-card border border-zinc-800/80 p-5 hover:border-orange-500/50 cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[180px] overflow-hidden"
          >
            {/* Background ambient gradient */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                tpl.gradient,
              )}
            />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-white group-hover:border-orange-500/40 transition-colors">
                  {tpl.icon}
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400">
                  {tpl.category}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors flex items-center gap-2">
                  <span>{tpl.title}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-orange-400" />
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {tpl.description}
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between text-xs text-orange-400 font-medium opacity-80 group-hover:opacity-100">
              <span>Use Template &rarr;</span>
              <span className="text-[10px] text-zinc-500 font-mono">
                React + Tailwind
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
