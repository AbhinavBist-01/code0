"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Paperclip,
  ArrowUpRight,
  Cpu,
  ChevronDown,
  Wand2,
  Code2,
  Zap,
  BarChart3,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptInputProps {
  onGenerate?: (prompt: string, model: string) => void;
  className?: string;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  onGenerate,
  className,
}) => {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("Claude 3.5 Sonnet");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const models = [
    { name: "Claude 3.5 Sonnet", tag: "Fast & Accurate", badge: "Recommended" },
    { name: "GPT-4o", tag: "Creative UI", badge: "Popular" },
    { name: "DeepSeek V3", tag: "Logic & Code", badge: "New" },
    { name: "Gemini 1.5 Pro", tag: "Long Context", badge: "Pro" },
  ];

  const starterPrompts = [
    {
      title: "SaaS Analytics Dashboard",
      prompt: "Build a modern glassmorphic SaaS analytics dashboard with dark theme, revenue charts, activity log, and metric cards.",
      icon: <BarChart3 className="h-3.5 w-3.5 text-orange-400" />,
    },
    {
      title: "Dark Auth Modal",
      prompt: "Create a sleek authentication modal with social logins, passwordless magic link input, and subtle orange border glow.",
      icon: <ShieldCheck className="h-3.5 w-3.5 text-red-400" />,
    },
    {
      title: "Interactive Pricing Table",
      prompt: "Design a 3-tier dark theme pricing section with monthly/yearly toggle, feature matrix, and glowing CTA buttons.",
      icon: <Flame className="h-3.5 w-3.5 text-amber-400" />,
    },
    {
      title: "Developer Portfolio Hero",
      prompt: "Generate a minimalist developer portfolio hero section with interactive code preview, tech stack icons, and floating dock.",
      icon: <Code2 className="h-3.5 w-3.5 text-orange-400" />,
    },
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    if (onGenerate) {
      onGenerate(prompt, selectedModel);
    }
    setTimeout(() => setIsGenerating(false), 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto flex flex-col gap-4 z-20", className)}>
      {/* Central Glass Prompt Container */}
      <div className="glass-card rounded-2xl p-4 border border-zinc-800/90 shadow-2xl relative group transition-all duration-300 focus-within:border-orange-500/50">
        {/* Glow ambient background */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-600/20 via-red-600/10 to-orange-600/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none blur-md" />

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-3">
          {/* Main Text Area */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask code0 to generate a UI component, full page layout, or interactive web application..."
            rows={3}
            className="w-full bg-transparent text-white placeholder-zinc-500 text-base md:text-lg focus:outline-none resize-none leading-relaxed font-sans"
          />

          {/* Prompt Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/70">
            {/* Left Controls: Model dropdown & Attachment */}
            <div className="flex items-center gap-2">
              {/* Model Dropdown Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowModelDropdown(!showModelDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-300 transition-all cursor-pointer"
                >
                  <Cpu className="h-3.5 w-3.5 text-orange-400" />
                  <span>{selectedModel}</span>
                  <ChevronDown className="h-3 w-3 text-zinc-500" />
                </button>

                {/* Model Selector Menu */}
                {showModelDropdown && (
                  <div className="absolute left-0 bottom-full mb-2 w-64 glass-panel rounded-xl p-1.5 z-50 shadow-2xl space-y-1">
                    <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                      Select AI Model
                    </div>
                    {models.map((m) => (
                      <button
                        key={m.name}
                        type="button"
                        onClick={() => {
                          setSelectedModel(m.name);
                          setShowModelDropdown(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer",
                          selectedModel === m.name
                            ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                            : "text-zinc-300 hover:bg-zinc-800/60"
                        )}
                      >
                        <div className="flex flex-col">
                          <span>{m.name}</span>
                          <span className="text-[10px] text-zinc-500">{m.tag}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                          {m.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Attachment reference button */}
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 text-xs text-zinc-400 hover:text-white transition-all cursor-pointer"
                title="Attach reference image or wireframe"
              >
                <Paperclip className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Attach</span>
              </button>
            </div>

            {/* Right Controls: Keyboard hint & Generate CTA */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-[11px] text-zinc-500 font-mono">
                Press <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">⌘</kbd> + <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">Enter</kbd>
              </span>

              <button
                type="submit"
                disabled={!prompt.trim() || isGenerating}
                className={cn(
                  "flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300",
                  prompt.trim() && !isGenerating
                    ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-lg shadow-orange-950/50 cursor-pointer active:scale-95"
                    : "bg-zinc-800/50 text-zinc-600 cursor-not-allowed border border-zinc-800"
                )}
              >
                {isGenerating ? (
                  <>
                    <Wand2 className="h-4 w-4 animate-spin text-orange-300" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span>Generate</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Starter Prompts Grid Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
        {starterPrompts.map((sp, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setPrompt(sp.prompt)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-card text-xs text-zinc-300 hover:text-white border border-zinc-800 hover:border-orange-500/40 transition-all duration-200 cursor-pointer group"
          >
            {sp.icon}
            <span>{sp.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
