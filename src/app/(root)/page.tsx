"use client";

import React, { useState } from "react";
import { GlassNavbar } from "@/src/components/home/glass-navbar";
import { PromptInput } from "@/src/components/home/prompt-input";
import { TemplateGrid } from "@/src/components/home/template-grid";
import { ProjectSidebar } from "@/src/components/home/project-sidebar";
import { WorkspaceView } from "@/src/components/home/workspace-view";
import { Spotlight } from "@/src/components/ui/aceternity/spotlight";
import { Particles } from "@/src/components/ui/magicui/particles";
import { FloatingDock } from "@/src/components/ui/aceternity/floating-dock";
import { Sparkles, Terminal, Boxes, Layout, Flame } from "lucide-react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<"prompt" | "workspace">(
    "prompt",
  );
  const [currentPrompt, setCurrentPrompt] = useState(
    "Build a modern glassmorphic SaaS analytics dashboard with dark theme, revenue charts, and metric cards.",
  );

  const handleGenerate = (prompt: string, _model: string) => {
    setCurrentPrompt(prompt);
    setActiveView("workspace");
  };

  const dockItems = [
    {
      title: "Generator",
      icon: <Sparkles className="h-5 w-5 text-orange-400" />,
      href: "#",
    },
    {
      title: "Workbench",
      icon: <Terminal className="h-5 w-5 text-orange-400" />,
      href: "#",
    },
    {
      title: "Templates",
      icon: <Boxes className="h-5 w-5 text-orange-400" />,
      href: "#templates",
    },
    {
      title: "Components",
      icon: <Layout className="h-5 w-5 text-orange-400" />,
      href: "#",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-orange-500 selection:text-white font-sans">
      {/* Background Flame/Orange Particles */}
      <Particles
        className="absolute inset-0 z-0 pointer-events-none"
        quantity={110}
        color="#f97316"
        staticity={40}
      />

      {/* Top Glass Navbar */}
      <GlassNavbar
        onToggleSidebar={() => setSidebarOpen(true)}
        activeView={activeView}
        onSelectView={setActiveView}
      />

      {/* History Drawer Sidebar */}
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectProject={(title, prompt) => {
          if (prompt) {
            setCurrentPrompt(prompt);
            setActiveView("workspace");
          }
        }}
      />

      {/* Main Content Body */}
      <main className="flex-1 w-full px-4 md:px-6 py-8 flex flex-col items-center z-10 relative space-y-12">
        {/* Warm Orange Spotlight Highlight */}
        <Spotlight
          fill="#f97316"
          className="-top-36 left-1/2 -translate-x-1/2 md:-top-20"
        />

        {activeView === "prompt" ? (
          <>
            {/* Hero Header Section */}
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl pt-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-mono">
                <Flame className="h-3.5 w-3.5 text-orange-400 animate-pulse" />
                <span>Next-Gen AI Code Builder</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
                Build full-stack web apps <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-200 to-orange-500">
                  in plain English
                </span>
              </h1>

              <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
                Describe your component or page layout.{" "}
                <span className="text-white font-medium">code0</span> generates
                clean React, TypeScript, and Tailwind CSS code with instant live
                preview.
              </p>
            </div>

            {/* Central v0 Prompt Engine */}
            <PromptInput onGenerate={handleGenerate} />

            {/* Component Templates Grid */}
            <div id="templates" className="w-full pt-6">
              <TemplateGrid
                onSelectTemplate={(prompt) => {
                  setCurrentPrompt(prompt);
                  setActiveView("workspace");
                }}
              />
            </div>
          </>
        ) : (
          /* Live Workspace Split View Mode */
          <div className="w-full pt-4">
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => setActiveView("prompt")}
                className="text-xs font-medium text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                &larr; Back to Prompt Generator
              </button>

              <span className="text-xs text-zinc-500 font-mono">
                Live Interactive Workbench
              </span>
            </div>

            <WorkspaceView promptText={currentPrompt} />
          </div>
        )}
      </main>

      {/* Floating Bottom Dock */}
      <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <FloatingDock items={dockItems} />
        </div>
      </div>
    </div>
  );
}
