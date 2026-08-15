import { FileText, Lightbulb, Hash, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { AI_TOOLS, type AiTool } from "@/types/ai";

const TOOL_ICONS: Record<AiTool, typeof FileText> = {
  caption: FileText,
  ideas: Lightbulb,
  hashtags: Hash,
  "email-reply": Mail,
};

interface ToolSidebarProps {
  active: AiTool;
  onSelect: (tool: AiTool) => void;
}

export function ToolSidebar({ active, onSelect }: ToolSidebarProps) {
  return (
    <div className="space-y-1.5">
      {AI_TOOLS.map((tool) => {
        const Icon = TOOL_ICONS[tool.key];
        const isActive = tool.key === active;
        return (
          <button
            key={tool.key}
            onClick={() => onSelect(tool.key)}
            className={cn(
              "flex w-full items-start gap-3 rounded-xl border-2 border-transparent p-3 text-left transition-all",
              isActive
                ? "border-brand/40 bg-linear-to-r from-brand/15 to-transparent"
                : "hover:bg-surface-raised"
            )}
          >
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all",
                isActive ? "bg-brand text-white shadow-glow" : "bg-surface-raised text-ink-muted"
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className={cn("text-sm font-medium", isActive ? "text-brand" : "text-foreground")}>
                {tool.label}
              </p>
              <p className="truncate text-xs text-ink-faint">{tool.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}