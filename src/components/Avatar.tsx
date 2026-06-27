/**
 * Deterministic "marble" avatar — two soft, blurred, rotated shards over a
 * solid backing, masked to a circle. Mirrors the boring-avatars marble style
 * used across the visitors.now realtime feed and profile rows.
 */

// Marble palettes derived from the theme `--primary` (mixed toward white/black
// for tonal variety). Avatars stay varied per-visitor and re-theme automatically.
const mix = (pct: number, toward: "white" | "black") =>
  `color-mix(in oklch, var(--primary) ${pct}%, ${toward})`;
const P = "var(--primary)";
const PALETTES = [
  [mix(60, "white"), P, mix(55, "black")],
  [mix(80, "white"), mix(75, "black"), P],
  [P, mix(50, "white"), mix(40, "black")],
  [mix(45, "white"), mix(65, "black"), mix(85, "white")],
  [mix(70, "black"), P, mix(55, "white")],
  [mix(35, "white"), mix(80, "black"), P],
  [P, mix(30, "white"), mix(60, "black")],
  [mix(65, "white"), mix(50, "black"), mix(90, "white")],
];

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export function Avatar({ name, size = 24, className = "" }: AvatarProps) {
  const h = hash(name);
  const palette = PALETTES[h % PALETTES.length];
  const id = `mb_${(h % 100000).toString(36)}`;
  const rotA = (h % 360) - 180;
  const rotB = ((h >> 3) % 360) - 180;
  const tx = (h % 9) - 4;
  const ty = ((h >> 2) % 9) - 4;

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      role="img"
      aria-label={name}
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
    >
      <mask id={`${id}_m`} maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
        <rect width="80" height="80" rx="160" fill="#fff" />
      </mask>
      <g mask={`url(#${id}_m)`}>
        <rect width="80" height="80" fill={palette[0]} />
        <path
          filter={`url(#${id}_f)`}
          d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
          fill={palette[1]}
          transform={`translate(${tx} ${ty}) rotate(${rotA} 40 40) scale(1.4)`}
        />
        <path
          filter={`url(#${id}_f)`}
          style={{ mixBlendMode: "overlay" }}
          d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
          fill={palette[2]}
          transform={`translate(${-tx} ${-ty}) rotate(${rotB} 40 40) scale(1.4)`}
        />
      </g>
      <defs>
        <filter id={`${id}_f`} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}
