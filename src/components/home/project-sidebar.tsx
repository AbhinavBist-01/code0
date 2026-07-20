"use client";

import React, { useState } from "react";
import { X, Search, History, FolderPlus } from "lucide-react";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (title: string, prompt: string) => void;
}

export const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const historyItems = [
    {
      id: "1",
      title: "SaaS Analytics Dashboard",
      prompt:
        "Build a modern glassmorphic SaaS analytics dashboard with dark theme, revenue charts...",
      date: "2 mins ago",
      tags: ["Dashboard", "Charts"],
    },
    {
      id: "2",
      title: "Dark Mode Authentication Modal",
      prompt: "Create a sleek authentication modal with social logins...",
      date: "1 hour ago",
      tags: ["Auth", "Modal"],
    },
    {
      id: "3",
      title: "3-Tier Pricing Table",
      prompt:
        "Design a 3-tier dark theme pricing section with monthly/yearly toggle...",
      date: "Yesterday",
      tags: ["Pricing", "Components"],
    },
    {
      id: "4",
      title: "Developer Portfolio Hero",
      prompt: "Generate a minimalist developer portfolio hero section...",
      date: "2 days ago",
      tags: ["Portfolio", "Hero"],
    },
  ];

  const filteredItems = historyItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className="relative w-80 md:w-96 h-full glass-panel border-r border-zinc-800/90 flex flex-col z-10 shadow-2xl animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-orange-400" />
            <h3 className="font-semibold text-white text-sm">
              Generation History
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search & Actions */}
        <div className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50"
            />
          </div>

          <button
            onClick={() => {
              onSelectProject?.("New Project", "");
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30 text-xs font-semibold transition-all cursor-pointer"
          >
            <FolderPlus className="h-3.5 w-3.5" />
            <span>New Blank Canvas</span>
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-2.5">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
            Recent Generations
          </div>

          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectProject?.(item.title, item.prompt);
                onClose();
              }}
              className="group p-3 rounded-xl glass-card border border-zinc-800/80 hover:border-orange-500/40 cursor-pointer transition-all duration-200 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-zinc-200 group-hover:text-white transition-colors">
                  {item.title}
                </span>
                <span className="text-[10px] text-zinc-500">{item.date}</span>
              </div>

              <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                {item.prompt}
              </p>

              <div className="flex items-center gap-1.5 pt-1">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800/80 text-center text-xs text-zinc-500 font-mono">
          <span>code0 workspace v1.0</span>
        </div>
      </div>
    </div>
  );
};
