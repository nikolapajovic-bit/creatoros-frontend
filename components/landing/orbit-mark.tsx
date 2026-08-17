export function OrbitMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="orbitMarkFill" x1="6" y1="6" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--brand-hover)" }} />
          <stop offset="1" style={{ stopColor: "var(--brand)" }} />
        </linearGradient>
        <linearGradient id="orbitMarkRing" x1="2" y1="20" x2="38" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--gold)" }} />
          <stop offset="1" style={{ stopColor: "var(--brand)" }} />
        </linearGradient>
      </defs>

      <ellipse
        cx="20"
        cy="22"
        rx="17.5"
        ry="6.5"
        transform="rotate(-16 20 22)"
        stroke="url(#orbitMarkRing)"
        strokeWidth="1.6"
        opacity="0.85"
      />
      <circle cx="4.2" cy="26.4" r="1.7" className="fill-[var(--gold)]" />

      <circle cx="19" cy="17" r="12.5" fill="url(#orbitMarkFill)" />

      <g transform="translate(13.2 12.6)">
        <rect x="0" y="6.6" width="2.3" height="4.6" rx="1.1" fill="white" />
        <rect x="4.1" y="3.6" width="2.3" height="7.6" rx="1.1" fill="white" />
        <rect x="8.2" y="0.6" width="2.3" height="10.6" rx="1.1" fill="white" />
      </g>

      <path
        d="M29 8.5l0.9 2 2 0.9-2 0.9-0.9 2-0.9-2-2-0.9 2-0.9z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}
