import { useEffect, useRef, useState } from "react";
import { CreditScore, Shield, Clock, Calculator } from "../icons";
import { FeatureText } from "./FeatureText";
import { Card } from "@/components/ui/card";

const TARGET = 100;
const R = 56;
const C = 2 * Math.PI * R;

function ScoreRing() {
  const [score, setScore] = useState(0);
  const ref = useRef<SVGSVGElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / 1800, 1);
            const eased = 1 - Math.pow(1 - p, 3);
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

  const done = score >= TARGET;
  const offset = C * (1 - score / 100);

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
            stroke="var(--primary)"
            strokeWidth="11.2"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            transform="rotate(-90 64 64)"
            style={{ transition: "stroke-dashoffset 80ms linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-4xl text-foreground font-medium tabular-nums">{score}</span>
        </div>
      </div>
      <span
        className="text-xl font-medium"
        style={
          done
            ? { color: "var(--primary)" }
            : {
                background: "linear-gradient(90deg, var(--muted-foreground) 25%, var(--muted-foreground) 50%, var(--muted-foreground) 75%)",
                backgroundSize: "200% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 2.5s linear infinite",
              }
        }
      >
        {done ? "Excellent" : "Checking"}
      </span>
      <p className="text-sm text-muted-foreground text-center text-balance max-w-64">
        Based on your soft search, you're a strong match for several of our lenders.
      </p>
      <div className="flex items-center gap-4 text-sm text-foreground font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary/40" />Fair
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />Good
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />Excellent
        </span>
      </div>
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
