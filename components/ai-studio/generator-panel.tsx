"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, RefreshCw } from "lucide-react";
import { generateContentRequest } from "@/lib/api/ai";
import type { AiToolConfig } from "@/types/ai";

type Status = "idle" | "generating" | "done" | "error";

export function GeneratorPanel({ tool }: { tool: AiToolConfig }) {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setStatus("generating");
    setCopied(false);
    try {
      const generated = await generateContentRequest(tool.key, prompt);
      setResult(generated);
      setStatus("done");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Generation failed");
      setStatus("error");
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand shadow-glow">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-foreground">{tool.label}</p>
          <p className="text-sm text-muted-foreground">{tool.description}</p>
        </div>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={tool.placeholder}
        rows={4}
        className="w-full resize-none rounded-xl border-2 border-surface-border bg-canvas p-3.5 text-sm text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none"
      />

      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || status === "generating"}
        className="flex w-fit items-center gap-2 rounded-xl bg-linear-to-r from-brand to-brand-hover px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all disabled:opacity-40 disabled:shadow-none"
      >
        {status === "generating" ? (
          <RefreshCw className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        {status === "generating" ? "Generating..." : "Generate"}
      </button>

      {status === "error" && (
        <div className="rounded-xl bg-fall/10 p-4 ring-1 ring-fall/20">
          <p className="text-sm text-fall">{errorMessage}</p>
        </div>
      )}

      {status === "done" && (
        <div className="overflow-hidden rounded-xl bg-linear-to-b from-brand/10 to-transparent ring-1 ring-foreground/10">
          <div className="flex items-center justify-between border-b border-surface-border/60 px-4 py-3">
            <span className="text-xs font-medium uppercase tracking-wider text-ink-faint">Result</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-ink-muted transition-colors hover:bg-surface-raised hover:text-brand"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-rise" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="whitespace-pre-line p-4 text-sm leading-relaxed text-foreground">{result}</p>
        </div>
      )}
    </div>
  );
}