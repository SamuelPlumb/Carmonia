import { Avatar } from "./Avatar";

/**
 * Stylised "visitor globe" — a shaded sphere with meridian/parallel lines and
 * a scattering of live visitor pins that gently float. Stands in for the
 * interactive Mapbox globe on the original realtime card.
 */

const PINS = [
  { name: "Black Horse", x: 30, y: 26, delay: 0 },
  { name: "MotoNovo", x: 62, y: 18, delay: 0.8 },
  { name: "Advantage Finance", x: 78, y: 42, delay: 1.6 },
  { name: "Moneybarn", x: 52, y: 38, delay: 0.4 },
  { name: "Zopa", x: 40, y: 56, delay: 1.2 },
  { name: "Oodle", x: 70, y: 64, delay: 2 },
];

export function Globe() {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      <div className="relative" style={{ width: 360, height: 360 }}>
        {/* sphere */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 280,
            height: 280,
            background:
              "radial-gradient(circle at 34% 30%, color-mix(in oklch, var(--primary) 22%, white) 0%, color-mix(in oklch, var(--primary) 50%, white) 38%, var(--primary) 64%, color-mix(in oklch, var(--primary) 65%, black) 100%)",
            boxShadow:
              "inset -18px -22px 48px color-mix(in oklch, var(--primary) 45%, black), 0 24px 60px color-mix(in oklch, var(--primary) 35%, transparent)",
          }}
        />
        {/* graticule */}
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          width={280}
          height={280}
          viewBox="0 0 280 280"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="globe-clip">
              <circle cx="140" cy="140" r="140" />
            </clipPath>
          </defs>
          <g clipPath="url(#globe-clip)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" fill="none">
            <circle cx="140" cy="140" r="139" />
            {[40, 80, 140, 200, 240].map((y) => (
              <line key={y} x1="0" y1={y} x2="280" y2={y} opacity={0.5} />
            ))}
            {[28, 70, 140, 210, 252].map((rx) => (
              <ellipse key={rx} cx="140" cy="140" rx={Math.abs(140 - rx)} ry="140" opacity={0.5} />
            ))}
          </g>
        </svg>

        {/* live pins */}
        {PINS.map((p) => (
          <div
            key={p.name}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%`, animation: `float 6s ease-in-out ${p.delay}s infinite` }}
          >
            <span
              className="absolute -inset-1 rounded-full bg-white/60"
              style={{ animation: `ping-ring 2.4s ${p.delay}s cubic-bezier(0,0,0.2,1) infinite` }}
            />
            <span className="relative block rounded-full border-2 border-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
              <Avatar name={p.name} size={24} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
