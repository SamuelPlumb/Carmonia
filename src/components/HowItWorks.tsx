import type { ReactNode } from "react";
import { Badge } from "./SectionHeader";
import { Logo, IconBox } from "./icons";
import { Card } from "@/components/ui/card";

/* ---- lender wordmark chips (step 1) ---- */
const LENDERS = ["Black Horse", "MotoNovo", "Advantage Finance", "Moneybarn", "Zopa", "Oodle"];

function CenterNode() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-white border border-border flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      <Logo height={26} className="text-foreground" />
    </div>
  );
}

function StepCard({ step, visual, lead, rest }: { step: number; visual: ReactNode; lead: string; rest: string }) {
  return (
    <Card className="bg-muted rounded-xl overflow-hidden border-0 shadow-none gap-0 py-0">
      <div className="h-[200px] relative overflow-hidden p-6 flex items-center justify-center border-b border-accent">{visual}</div>
      <div className="p-6 flex flex-col items-center gap-3">
        <IconBox>
          <span className="text-base font-semibold text-primary">{step}</span>
        </IconBox>
        <h3 className="text-lg/6 font-medium text-center text-foreground">
          {lead} <span className="text-muted-foreground">{rest}</span>
        </h3>
      </div>
    </Card>
  );
}

export function HowItWorks() {
  return (
    <section className="py-16 flex flex-col gap-12 relative overflow-hidden">
      <div className="w-full max-w-3xl mx-auto px-5 flex flex-col items-center text-center gap-5">
        <Badge>How it works</Badge>
        <h2 className="text-4xl leading-11 text-foreground text-balance max-w-md">Get on the road in three simple steps</h2>
        <p className="w-full max-w-sm font-medium text-muted-foreground">
          Applying takes a couple of minutes and won't affect your credit score. Here's how car finance works with Carmonia.
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 — apply online (lender marquee) */}
        <StepCard
          step={1}
          lead="Apply online."
          rest="Tell us a bit about yourself and your budget. We'll give you a quick decision and an approval in principle."
          visual={
            <div className="absolute inset-0 flex items-center mask-fade-x">
              <CenterNode />
              <div className="flex items-center gap-6 absolute" style={{ animation: "marquee 26s linear infinite" }}>
                {[...LENDERS, ...LENDERS].map((name, i) => (
                  <div
                    key={i}
                    className="shrink-0 h-9 px-3.5 flex items-center rounded-lg bg-white border border-border text-sm font-semibold tracking-tight text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.06)] whitespace-nowrap"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          }
        />

        {/* Step 2 — choose your car */}
        <StepCard
          step={2}
          lead="Choose your car."
          rest="Pick from any reputable dealer, or browse cars to suit your budget in our members area."
          visual={
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                <line x1="50%" y1="50%" x2="22%" y2="32%" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="78%" y2="34%" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="72%" y2="74%" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" />
              </svg>
              <CenterNode />
              <div className="absolute left-[22%] top-[32%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex items-center justify-center">
                <span className="w-5 h-5 rounded-full bg-primary" />
              </div>
              <div className="absolute left-[78%] top-[34%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] flex items-center justify-center">
                <span className="w-5 h-5 rounded-full bg-primary/70" />
              </div>
              <div className="absolute left-[72%] top-[74%] -translate-x-1/2 -translate-y-1/2 px-2 h-7 rounded-md bg-primary/15 text-primary text-xs font-semibold flex items-center" style={{ animation: "float 5s ease-in-out infinite" }}>
                £12,450
              </div>
            </div>
          }
        />

        {/* Step 3 — drive away */}
        <StepCard
          step={3}
          lead="Drive away."
          rest="We sort the paperwork with the dealer and lender. You just collect the keys and go."
          visual={
            <div className="w-[78%] flex flex-col gap-2.5">
              {[
                { l: "Hatchback", w: 92 },
                { l: "SUV", w: 64 },
                { l: "Saloon", w: 44 },
                { l: "Estate", w: 28 },
              ].map((b, i) => (
                <div key={b.l} className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground w-14 shrink-0">{b.l}</span>
                  <div className="flex-1 h-2.5 rounded-md bg-accent overflow-hidden">
                    <div
                      className="h-full rounded-md bg-primary"
                      style={{ width: `${b.w}%`, opacity: 1 - i * 0.16 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </div>
    </section>
  );
}
