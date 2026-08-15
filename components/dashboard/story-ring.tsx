interface StoryRingProps {
  percent: number;
  label: string;
  value: string;
}

export function StoryRing({ percent, label, value }: StoryRingProps) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-2">
      <div className="relative flex h-36 w-36 items-center justify-center">
        <svg viewBox="0 0 130 130" className="h-full w-full -rotate-90">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C5CFC" />
              <stop offset="55%" stopColor="#F5A623" />
              <stop offset="100%" stopColor="#4ADE80" />
            </linearGradient>
          </defs>
          <circle cx="65" cy="65" r={radius} fill="none" stroke="#2A2636" strokeWidth="10" />
          <circle
            cx="65"
            cy="65"
            r={radius}
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-mono text-2xl font-semibold text-foreground">{value}</span>
          <span className="text-[11px] text-ink-faint">{label}</span>
        </div>
      </div>
    </div>
  );
}