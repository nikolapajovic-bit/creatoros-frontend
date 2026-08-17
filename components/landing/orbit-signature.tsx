/**
 * Ambient, oversized echo of the CreatorOS logomark (planet + orbit ring).
 * Purely decorative — sits behind hero / CTA content as the page's signature
 * motif. The orbiting dot is gold, the same token used for money/deal
 * figures elsewhere in the product. Colors are pulled from CSS vars, so it
 * follows the app's theme automatically.
 */
export function OrbitSignature({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 800 800" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="orbitSigRing" x1="60" y1="400" x2="740" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--gold)" }} stopOpacity="0.55" />
            <stop offset="0.5" style={{ stopColor: "var(--brand)" }} stopOpacity="0.55" />
            <stop offset="1" style={{ stopColor: "var(--brand)" }} stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="orbitSigGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" style={{ stopColor: "var(--brand)" }} stopOpacity="0.3" />
            <stop offset="1" style={{ stopColor: "var(--brand)" }} stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="400" cy="400" r="340" fill="url(#orbitSigGlow)" />

        <g transform="rotate(-14 400 430)">
          <ellipse
            cx="400"
            cy="430"
            rx="330"
            ry="120"
            stroke="url(#orbitSigRing)"
            strokeWidth="1.5"
            strokeDasharray="2 10"
          />
          <circle r="5" className="fill-[var(--gold)]">
            <animateMotion
              dur="18s"
              repeatCount="indefinite"
              path="M 400 430 m -330,0 a 330,120 0 1,0 660,0 a 330,120 0 1,0 -660,0"
              rotate="auto"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}
