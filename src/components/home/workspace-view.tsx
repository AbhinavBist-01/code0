"use client";

import React, { useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  FileCode,
  Sparkles,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

interface WorkspaceViewProps {
  promptText?: string;
  className?: string;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  promptText = "SaaS Analytics Dashboard",
  className,
}) => {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );
  const [selectedFile, setSelectedFile] = useState("AnalyticsDashboard.tsx");
  const [copied, setCopied] = useState(false);

  const files = [
    { name: "AnalyticsDashboard.tsx", language: "typescript" },
    { name: "MetricCard.tsx", language: "typescript" },
    { name: "RevenueChart.tsx", language: "typescript" },
    { name: "globals.css", language: "css" },
  ];

  const codeSnippets: Record<string, string> = {
    "AnalyticsDashboard.tsx": `"use client";

import React from "react";
import { MetricCard } from "./MetricCard";
import { RevenueChart } from "./RevenueChart";
import { DollarSign, Users, TrendingUp } from "lucide-react";

export default function AnalyticsDashboard() {
  return (
    <div className="p-6 bg-slate-950 text-white min-h-screen space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
          <p className="text-sm text-zinc-400">Real-time performance metrics</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-orange-600 text-sm font-semibold hover:bg-orange-500 transition-all">
          Generate Report
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Total Revenue" value="$128,430" change="+14.2%" icon={<DollarSign />} />
        <MetricCard title="Active Users" value="14,290" change="+8.1%" icon={<Users />} />
        <MetricCard title="Conversion Rate" value="3.42%" change="+2.4%" icon={<TrendingUp />} />
      </div>

      {/* Chart Section */}
      <RevenueChart />
    </div>
  );
}`,
    "MetricCard.tsx": `import React from "react";

export function MetricCard({ title, value, change, icon }) {
  return (
    <div className="p-4 rounded-2xl glass-card border border-zinc-800 space-y-2">
      <div className="flex items-center justify-between text-zinc-400">
        <span className="text-xs font-medium">{title}</span>
        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">{icon}</div>
      </div>
      <div className="text-2xl font-extrabold">{value}</div>
      <span className="text-xs text-emerald-400 font-semibold">{change} vs last month</span>
    </div>
  );
}`,
    "RevenueChart.tsx": `import React from "react";

export function RevenueChart() {
  return (
    <div className="p-6 rounded-2xl glass-card border border-zinc-800 space-y-4">
      <h3 className="font-bold text-lg">Revenue Trajectory</h3>
      <div className="h-48 w-full bg-gradient-to-t from-orange-950/40 via-red-950/10 to-transparent rounded-xl border border-orange-500/20 flex items-end justify-between p-4">
        {[40, 65, 50, 85, 90, 75, 100].map((h, i) => (
          <div key={i} className="w-8 bg-orange-500 rounded-t-lg transition-all hover:bg-orange-400" style={{ height: \`\${h}%\` }} />
        ))}
      </div>
    </div>
  );
}`,
    "globals.css": `@import "tailwindcss";

@layer base {
  body {
    background-color: #09090b;
    color: #fafafa;
  }
}`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[selectedFile] || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const viewportWidths = {
    desktop: "w-full",
    tablet: "max-w-2xl mx-auto",
    mobile: "max-w-sm mx-auto",
  };

  return (
    <div
      className={cn(
        "w-full max-w-7xl mx-auto h-[750px] glass-panel rounded-2xl border border-zinc-800 flex flex-col overflow-hidden shadow-2xl z-20 relative",
        className,
      )}
    >
      {/* Top Workbench Header */}
      <div className="px-4 py-3 border-b border-zinc-800/90 flex flex-wrap items-center justify-between gap-3 bg-zinc-950/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>

          <div className="h-4 w-[1px] bg-zinc-800" />

          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-orange-400 animate-pulse" />
            <span className="font-mono text-xs text-zinc-300 font-semibold truncate max-w-md">
              {promptText}
            </span>
          </div>
        </div>

        {/* Workspace controls */}
        <div className="flex items-center gap-2">
          {/* Mobile/Tablet/Desktop Viewport Toggles */}
          <div className="hidden sm:flex items-center p-1 rounded-lg bg-zinc-900 border border-zinc-800">
            <button
              onClick={() => setViewport("desktop")}
              className={cn(
                "p-1.5 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer",
                viewport === "desktop" && "bg-zinc-800 text-white",
              )}
              title="Desktop View"
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewport("tablet")}
              className={cn(
                "p-1.5 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer",
                viewport === "tablet" && "bg-zinc-800 text-white",
              )}
              title="Tablet View"
            >
              <Tablet className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              className={cn(
                "p-1.5 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer",
                viewport === "mobile" && "bg-zinc-800 text-white",
              )}
              title="Mobile View"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Copy Code & Download Button */}
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 transition-all cursor-pointer"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copied ? "Copied" : "Copy Code"}</span>
          </button>
        </div>
      </div>

      {/* Main Split Workbench Body */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* Left Side: File Tree & Code Editor (5 cols) */}
        <div className="md:col-span-5 border-r border-zinc-800/80 bg-zinc-950/90 flex flex-col overflow-hidden">
          {/* File Tab Bar */}
          <div className="flex items-center overflow-x-auto border-b border-zinc-800/80 bg-zinc-900/40 px-2 py-1 scrollbar-none">
            {files.map((file) => (
              <button
                key={file.name}
                onClick={() => setSelectedFile(file.name)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-md transition-all whitespace-nowrap cursor-pointer",
                  selectedFile === file.name
                    ? "bg-zinc-800/90 text-orange-300 border border-orange-500/30"
                    : "text-zinc-400 hover:text-zinc-200",
                )}
              >
                <FileCode className="h-3.5 w-3.5 text-orange-400" />
                <span>{file.name}</span>
              </button>
            ))}
          </div>

          {/* Syntax Code Editor Canvas */}
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto leading-relaxed bg-zinc-950 text-zinc-300">
            <pre className="whitespace-pre-wrap font-mono">
              <code>{codeSnippets[selectedFile]}</code>
            </pre>
          </div>
        </div>

        {/* Right Side: Live Rendered Component Preview (7 cols) */}
        <div className="md:col-span-7 bg-zinc-950 flex flex-col overflow-hidden relative p-4">
          <div
            className={cn(
              "flex-1 h-full rounded-xl border border-zinc-800/90 overflow-hidden bg-slate-950 transition-all duration-300 shadow-inner flex flex-col",
              viewportWidths[viewport],
            )}
          >
            {/* Live Interactive Preview Container */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white">
                    SaaS Overview
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Live generated component preview
                  </p>
                </div>
                <button className="px-3.5 py-1.5 rounded-lg bg-orange-600 text-xs font-semibold text-white shadow-md shadow-orange-950 hover:bg-orange-500 transition-all cursor-pointer">
                  Export Code
                </button>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl glass-card border border-zinc-800 space-y-1">
                  <span className="text-[11px] text-zinc-400">Revenue</span>
                  <div className="text-lg font-bold text-white">$128,430</div>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    +14.2%
                  </span>
                </div>
                <div className="p-4 rounded-xl glass-card border border-zinc-800 space-y-1">
                  <span className="text-[11px] text-zinc-400">
                    Active Users
                  </span>
                  <div className="text-lg font-bold text-white">14,290</div>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    +8.1%
                  </span>
                </div>
                <div className="p-4 rounded-xl glass-card border border-zinc-800 space-y-1">
                  <span className="text-[11px] text-zinc-400">Conversion</span>
                  <div className="text-lg font-bold text-white">3.42%</div>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    +2.4%
                  </span>
                </div>
              </div>

              {/* Chart Visual */}
              <div className="p-4 rounded-xl glass-card border border-zinc-800 space-y-3">
                <span className="text-xs font-semibold text-zinc-300">
                  Revenue Growth
                </span>
                <div className="h-36 w-full bg-gradient-to-t from-orange-950/40 via-red-950/10 to-transparent rounded-lg border border-orange-500/20 flex items-end justify-between p-3 gap-2">
                  {[45, 70, 55, 90, 95, 80, 100].map((val, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-orange-500/80 hover:bg-orange-400 rounded-t transition-all"
                      style={{ height: `${val}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
