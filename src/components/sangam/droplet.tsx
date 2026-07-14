export function Droplet({ size = 72, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 80" className={className} aria-hidden>
      <defs>
        <linearGradient id="dgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--indigo)" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path d="M32 4 C 44 26, 58 42, 58 56 A 26 26 0 1 1 6 56 C 6 42, 20 26, 32 4 Z"
            fill="url(#dgrad)" />
      <path d="M20 46 C 22 40, 28 38, 32 42" stroke="var(--silt)" strokeOpacity="0.6" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function WaveGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 24" className={className} aria-hidden>
      <path d="M2 12 C 10 4, 18 20, 26 12 S 42 4, 50 12 S 62 20, 62 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}