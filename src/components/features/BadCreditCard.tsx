import { useEffect, useLayoutEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { CreditScore, FactCheck, Groups, Shield } from "../icons";
import { FeatureText } from "./FeatureText";
import { useFeatureTick } from "./featureTick";
import { Card } from "@/components/ui/card";

// Five even bands across 0–999 (each one fifth of the range) with Experian's
// score-dial palette. Equal score widths mean the fill tracks the score
// linearly — the dial reads evenly: 999 fills it completely, 0 empties it.
const BANDS = [
  { name: "Bad", min: 0, max: 199, color: "#BD2327" }, // red
  { name: "Poor", min: 200, max: 399, color: "#F89937" }, // orange
  { name: "Fair", min: 400, max: 599, color: "#FADD00" }, // yellow (white badge text is low-contrast here, kept for now)
  { name: "Good", min: 600, max: 799, color: "#8CC240" }, // light green
  { name: "Excellent", min: 800, max: 999, color: "#049D4D" }, // green
];

// The unfilled track is a light grey; only the score's reach is coloured in.
const TRACK = "#E2E4E7";

const MAX_SCORE = 999;

// Looping showcase: scores that jump between bands — up and down, never stepping
// through them in order. The fill sweeps, the number rolls, the badge swaps
// straight to each new band.
const SCORES = [640, 300, 910, 120, 500, 850, 240, 690, 410];

// Dial geometry — a 270° gauge with the gap centred at the bottom.
const CX = 120;
const CY = 120;
const R = 90;
const SW = 16; // band thickness
const START = -135; // degrees; 0° = top, clockwise positive
const SWEEP = 270;
const GAP = 16; // gap between segments, in degrees
const SEG = (SWEEP - GAP * (BANDS.length - 1)) / BANDS.length;

function polar(deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180; // shift so 0° points up
  return [CX + R * Math.cos(a), CY + R * Math.sin(a)];
}

// SVG arc path between two angles (clockwise) along the dial radius.
function arc(from: number, to: number): string {
  const [x1, y1] = polar(from);
  const [x2, y2] = polar(to);
  const large = to - from > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

const segStart = (i: number) => START + i * (SEG + GAP);

// score → its band index + how far through that band it sits (0..1)
function locate(score: number) {
  const i = BANDS.findIndex((b) => score <= b.max);
  const bi = i === -1 ? BANDS.length - 1 : i;
  const b = BANDS[bi];
  const t = Math.max(0, Math.min(1, (score - b.min) / (b.max - b.min)));
  return { bi, t };
}

// The band label: a solid pill in the band's bold colour with white text, whose
// width animates to fit each new band and rolls up as it changes (mirrors the
// map's live-approval badge).
function BandBadge({ band }: { band: (typeof BANDS)[number] }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>();

  // Measure each new label and animate the pill's width to fit it.
  useLayoutEffect(() => {
    if (textRef.current) setWidth(textRef.current.offsetWidth);
  }, [band.name]);

  return (
    <span
      className="inline-flex h-6 items-center overflow-hidden rounded-sm text-sm font-medium text-white"
      style={{
        width,
        backgroundColor: band.color,
        transition: "width 380ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <span key={band.name} ref={textRef} className="band-roll inline-block whitespace-nowrap px-2.5">
        {band.name}
      </span>
    </span>
  );
}

function ScoreDial() {
  const [idx, setIdx] = useState(0);
  const score = SCORES[idx]; // current target
  const [display, setDisplay] = useState(score); // animated value that drives the arc sweep
  const displayRef = useRef(score);

  // Advance on the shared feature tick, so the dial changes at the exact same
  // moment a new car appears in the profiles card. Held still under reduced motion.
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useFeatureTick(() => setIdx((i) => (i + 1) % SCORES.length), !reduceMotion);

  // Sweep the arc smoothly toward each new target. Only the fill animates through
  // the in-between (like a needle); the number rolls via NumberFlow and the badge
  // jumps straight to the new band.
  useEffect(() => {
    const from = displayRef.current;
    if (from === score) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 800, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      const v = from + (score - from) * eased;
      displayRef.current = v;
      setDisplay(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const { bi } = locate(score);
  const band = BANDS[bi];
  const fill = locate(display);

  return (
    <div
      className="flex flex-col items-center justify-center gap-4"
      role="img"
      aria-label={`Credit score ${score} out of ${MAX_SCORE}, band ${band.name}`}
    >
      <div className="relative">
        <svg viewBox="0 0 240 240" width="230" height="230" aria-hidden>
          {BANDS.map((b, i) => {
            const s = segStart(i);
            const e = s + SEG;
            // How far this segment is filled by the animated value (sweeps smoothly).
            const frac = i < fill.bi ? 1 : i === fill.bi ? fill.t : 0;
            return (
              <g key={b.name}>
                <path d={arc(s, e)} fill="none" stroke={TRACK} strokeWidth={SW} strokeLinecap="round" />
                {frac > 0.001 && (
                  <path d={arc(s, s + frac * SEG)} fill="none" stroke={b.color} strokeWidth={SW} strokeLinecap="round" />
                )}
              </g>
            );
          })}
        </svg>

        {/* Score, dead-centre — rolls smoothly between values (NumberFlow, as in Pricing). */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <NumberFlow
            value={score}
            transformTiming={{ duration: 800, easing: "cubic-bezier(0.33, 1, 0.68, 1)" }}
            spinTiming={{ duration: 800, easing: "cubic-bezier(0.33, 1, 0.68, 1)" }}
            className="text-[3.25rem] font-medium tabular-nums leading-none text-foreground"
          />
        </div>
      </div>

      {/* Band badge + reassurance in a pill (like the live-approval badge on the map);
          the pill expands and shrinks with the badge as the band changes. */}
      <div className="flex items-center gap-2 rounded-md bg-white py-1.5 pl-1.5 pr-4 shadow-md ring-1 ring-black/5">
        <BandBadge band={band} />
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          You're always considered by our lenders
        </span>
      </div>
    </div>
  );
}

export function BadCreditCard() {
  return (
    <Card className="flex flex-col bg-muted rounded-xl min-h-[280px] overflow-hidden border-0 shadow-none gap-0 py-0">
      <FeatureText
        accent="amber"
        icon={<CreditScore className="text-primary" />}
        title="Bad credit specialists"
        subtitle="We work with lenders who consider CCJs, defaults and past rejections."
        items={[
          { icon: <FactCheck width={16} height={16} />, label: "CCJs and defaults considered" },
          { icon: <Groups width={16} height={16} />, label: "Lenders for every credit profile" },
          { icon: <Shield width={16} height={16} viewBox="0 0 16 16" />, label: "Soft search, no impact on your score" },
        ]}
      />
      <div className="w-full h-[320px] p-6 px-8 pt-0 flex flex-col items-center justify-center">
        <ScoreDial />
      </div>
    </Card>
  );
}
