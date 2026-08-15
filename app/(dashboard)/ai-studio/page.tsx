"use client";

import { useState } from "react";
import { ToolSidebar } from "@/components/ai-studio/tool-sidebar";
import { GeneratorPanel } from "@/components/ai-studio/generator-panel";
import { AI_TOOLS, type AiTool } from "@/types/ai";

export default function AiStudioPage() {
  const [activeTool, setActiveTool] = useState<AiTool>("caption");
  const toolConfig = AI_TOOLS.find((t) => t.key === activeTool)!;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">AI Studio</h1>
        <p className="text-sm text-muted-foreground">
          Generate captions, ideas, hashtags, and email replies
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <div className="relative overflow-hidden rounded-2xl bg-surface/80 p-3 backdrop-blur-xl ring-1 ring-foreground/10 shadow-glow">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand/20 blur-[80px]" />
          <div className="relative">
            <ToolSidebar active={activeTool} onSelect={setActiveTool} />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-surface/80 p-6 backdrop-blur-xl ring-1 ring-foreground/10 shadow-glow">
          <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-brand/15 blur-[100px]" />
          <div className="relative">
            <GeneratorPanel tool={toolConfig} key={activeTool} />
          </div>
        </div>
      </div>
    </div>
  );
}