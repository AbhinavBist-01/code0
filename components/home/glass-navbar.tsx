"use client";

import React from "react";
import { Code0Logo } from "@/components/logo/code0-logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import {
  Sparkles,
  Command,
  PanelLeft,
  ChevronDown,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GlassNavbarProps {
  onToggleSidebar?: () => void;
  activeView?: "prompt" | "workspace";
  onSelectView?: (view: "prompt" | "workspace") => void;
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({
  onToggleSidebar,
  activeView = "prompt",
  onSelectView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-nav px-4 md:px-6 py-3 flex items-center justify-between transition-all">
      {/* Left section: Sidebar toggle & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 border border-transparent hover:border-zinc-700/60 transition-all cursor-pointer"
          title="Toggle Project History"
        >
          <PanelLeft className="h-4 w-4" />
        </button>

        <Code0Logo size="md" />

        {/* Workspace Switcher Pill */}
        <div className="hidden md:flex items-center gap-2 ml-4 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-mono text-zinc-400">workspace /</span>
          <span className="font-semibold text-white">main-project</span>
          <ChevronDown className="h-3 w-3 text-zinc-500" />
        </div>
      </div>

      {/* Center section: View switcher tabs */}
      <div className="hidden sm:flex items-center p-1 rounded-xl bg-zinc-900/80 border border-zinc-800/80">
        <button
          onClick={() => onSelectView?.("prompt")}
          className={cn(
            "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
            activeView === "prompt"
              ? "bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Generator</span>
        </button>
        <button
          onClick={() => onSelectView?.("workspace")}
          className={cn(
            "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer",
            activeView === "workspace"
              ? "bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          )}
        >
          <Terminal className="h-3.5 w-3.5" />
          <span>Workbench</span>
        </button>
      </div>

      {/* Right section: Command shortcut badge & User profile */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900/70 border border-zinc-800 text-xs text-zinc-400 font-mono">
          <Command className="h-3 w-3 text-zinc-500" />
          <span>K</span>
          <span className="text-zinc-600">Quick Search</span>
        </div>

        <ModeToggle />
        <UserButton />
      </div>
    </header>
  );
};
