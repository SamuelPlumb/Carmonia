import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { CreditScore, Shield, Clock, Calculator } from "../icons";
import { FeatureText } from "./FeatureText";
import { Card } from "@/components/ui/card";

const TARGET = 100;
const R = 56;
const C = 2 * Math.PI * R;
const RAMP_MS = 2600; // how long the score takes to match up to TARGET

// Resolve the site's primary blue (an oklch token) to a hex string —
// canvas-confetti only accepts hex colours. The 2D canvas fillStyle setter
// normalises any valid CSS colour (incl. oklch) to #rrggbb; fall back to a
// close hex if that ever fails.
function primaryHex(): string {
  const fallback = "#0a84d1";
  try {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
    if (!raw) return fallback;
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return fallback;
    ctx.fillStyle = raw;
    const hex = ctx.fillStyle;
    return typeof hex === "string" && hex.startsWith("#") && hex !== "#000000" ? hex : fallback;
  } catch {
    return fallback;
  }
}

function ScoreRing() {
  const [score, setScore] = useState(0);
  const ref = useRef<SVGSVGElement>(null);
  const started = useRef(false);
  // Card-scoped canvas + a confetti instance bound to it, so the burst is
  // painted inside the card (and clipped by its overflow-hidden) rather than
  // over the whole viewport.
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cannonRef = useRef<ReturnType<typeof confetti.create> | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / RAMP_MS, 1);
            // ease-in-out cubic — a speed ramp: builds up to full speed in the
            // middle, then settles onto the target rather than braking hard.
            const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
            setScore(Math.round(eased * TARGET));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Bind a confetti instance to the card-scoped canvas once.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    cannonRef.current = confetti.create(canvas, { resize: true });
    return () => {
      cannonRef.current?.reset();
      cannonRef.current = null;
    };
  }, []);

  const done = score >= TARGET;
  const offset = C * (1 - score / 100);
  // The whole ring is one solid colour at a time (no gradient); that colour
  // deepens with the score, fading Fair (40%) → Strong (70%) → Perfect (100%)
  // — the same blue tiers as the legend below.
  const strength = 40 + (score / 100) * 60;
  const ringColor = `color-mix(in oklch, var(--primary) ${strength.toFixed(1)}%, var(--muted))`;

  // The moment the wheel completes, fire two cannons from the bottom corners,
  // both angled inward/up, all in the site's primary blue.
  useEffect(() => {
    if (!done || fired.current) return;
    const cannon = cannonRef.current;
    if (!cannon) return;
    fired.current = true;
    const base = {
      particleCount: 60,
      spread: 58,
      startVelocity: 38,
      ticks: 220,
      scalar: 0.85,
      colors: [primaryHex()],
      disableForReducedMotion: true,
    };
    cannon({ ...base, angle: 60, origin: { x: 0, y: 1 } }); // bottom-left → up-right
    cannon({ ...base, angle: 120, origin: { x: 1, y: 1 } }); // bottom-right → up-left
  }, [done]);

  return (
    <>
      <div className="relative flex items-center justify-center">
        <svg ref={ref} width="128" height="128" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={R} fill="none" stroke="var(--accent)" strokeWidth="11.2" />
          <circle
            cx="64"
            cy="64"
            r={R}
            fill="none"
            stroke={ringColor}
            strokeWidth="11.2"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            transform="rotate(-90 64 64)"
            style={{ transition: "stroke-dashoffset 80ms linear, stroke 200ms linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-4xl text-foreground font-medium tabular-nums">{score}</span>
        </div>
      </div>
      <span
        className="text-2xl/7 font-medium"
        style={
          done
            ? { color: "var(--primary)" }
            : {
                background:
                  "linear-gradient(90deg, var(--muted-foreground) 0%, var(--muted-foreground) 35%, var(--foreground) 50%, var(--muted-foreground) 65%, var(--muted-foreground) 100%)",
                backgroundSize: "200% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 2.5s linear infinite",
              }
        }
      >
        {done ? "Perfect match" : "Matching"}
      </span>
      <p className="text-sm text-muted-foreground text-center text-balance max-w-64">
        Based on your soft search, you're a strong match for several of our lenders.
      </p>
      <div className="flex items-center gap-4 text-sm text-foreground font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />Fair
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />Strong
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />Perfect
        </span>
      </div>
      {/* Confetti canvas — fills the card; the card clips it. */}
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 z-20 h-full w-full pointer-events-none" />
    </>
  );
}

export function PerformanceCard() {
  return (
    <Card className="flex flex-col bg-muted rounded-xl min-h-[280px] overflow-hidden relative border-0 shadow-none gap-0 py-0">
      <FeatureText
        accent="amber"
        icon={<CreditScore className="text-primary" />}
        title="Soft search quote"
        subtitle="See your real eligibility without affecting your credit score."
        items={[
          { icon: <Shield width={16} height={16} viewBox="0 0 16 16" />, label: "No impact on your credit score" },
          { icon: <Clock width={16} height={16} />, label: "A decision in minutes" },
          { icon: <Calculator width={16} height={16} />, label: "See what you could borrow" },
        ]}
      />
      <div className="w-full h-[320px] p-6 px-8 pt-0 flex flex-col gap-4 items-center justify-center">
        <ScoreRing />
      </div>
    </Card>
  );
}
