import { Camera, Music2, PlaySquare } from "lucide-react";

const PLATFORMS = [
  { icon: Camera, label: "Instagram" },
  { icon: Music2, label: "TikTok" },
  { icon: PlaySquare, label: "YouTube" },
];

export function PlatformRow() {
  return (
    <section className="px-3 pb-20 md:px-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-2xl bg-surface/60 px-6 py-5 ring-1 ring-foreground/10 backdrop-blur-xl sm:flex-row sm:justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          Analytics synced automatically from
        </p>
        <div className="flex items-center gap-7">
          {PLATFORMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-ink-muted">
              <Icon className="h-4 w-4" />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
