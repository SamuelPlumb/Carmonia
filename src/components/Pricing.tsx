import { useState } from "react";
import { Badge } from "./SectionHeader";
import { Button } from "./Button";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card } from "@/components/ui/card";

const BUDGET = { min: 50, max: 2000, step: 25 };
const TERMS = [24, 36, 48, 60];
const SCORES = ["Excellent", "Good", "Fair", "Poor", "Bad"];

// Representative APR by self-reported credit score, calibrated to Zuto's calculator.
const SCORE_APR: Record<string, number> = {
  Excellent: 8.9,
  Good: 8.9,
  Fair: 9.9,
  Poor: 11.6,
  Bad: 13.9,
};

export function Pricing() {
  const [budget, setBudget] = useState(250);
  const [termIdx, setTermIdx] = useState(0);
  const [score, setScore] = useState(SCORES[0]);
  const term = TERMS[termIdx];
  const apr = SCORE_APR[score];

  // Car value we think we could finance = present value of the monthly budget
  // treated as a repayment over the chosen term at the score's representative APR.
  // Rate is compounded effectively (to match Zuto), not as a simple APR/12.
  const monthlyRate = Math.pow(1 + apr / 100, 1 / 12) - 1;
  const carValue = (budget * (1 - Math.pow(1 + monthlyRate, -term))) / monthlyRate;
  const affordable = Math.round(carValue);

  return (
    <section id="pricing" className="py-16 flex flex-col gap-12 scroll-mt-28">
      <div className="w-full max-w-3xl mx-auto px-5 flex flex-col items-center text-center gap-5">
        <Badge>Pricing</Badge>
        <h2 className="text-4xl text-foreground leading-11 text-balance max-w-md">Simplified pricing</h2>
        <p className="w-full max-w-md font-medium text-lg/6 text-muted-foreground">
          No confusing tiers. You just pay for the events usage you need, everything is included.
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto px-5">
        <Card className="bg-background rounded-3xl border-0 p-0 gap-0 overflow-hidden shadow-[0px_3px_12px_rgba(0,0,0,0.06),0px_4px_16px_rgba(0,0,0,0.06),0px_0px_0px_1px_rgba(0,0,0,0.05)]">
          <div className="grid md:grid-cols-2">
            {/* left: breakdown */}
            <div className="flex flex-col gap-6 p-7 md:p-8">
              {/* monthly budget slider */}
              <div className="flex flex-col gap-3">
                <h3 className="font-medium text-foreground">My monthly budget</h3>
                <Slider value={[budget]} onValueChange={([v]) => setBudget(v)} min={BUDGET.min} max={BUDGET.max} step={BUDGET.step} aria-label="My monthly budget" />
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-semibold text-foreground tabular-nums">£{budget}</span>
                  <span className="text-muted-foreground text-sm">/ month</span>
                </div>
              </div>

              {/* repayment term slider */}
              <div className="flex flex-col gap-3">
                <h3 className="font-medium text-foreground">I'd like to repay over</h3>
                <Slider value={[termIdx]} onValueChange={([v]) => setTermIdx(v)} min={0} max={TERMS.length - 1} step={1} aria-label="I'd like to repay over" />
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-semibold text-foreground tabular-nums">{term}</span>
                  <span className="text-muted-foreground text-sm">months</span>
                </div>
              </div>

              {/* credit score selector */}
              <div className="flex flex-col gap-3">
                <h3 className="font-medium text-foreground">My credit score is</h3>
                <ToggleGroup
                  type="single"
                  value={score}
                  onValueChange={(v) => v && setScore(v)}
                  spacing={1}
                  className="w-full p-1 rounded-lg bg-muted"
                >
                  {SCORES.map((s) => (
                    <ToggleGroupItem
                      key={s}
                      value={s}
                      className="flex-1 rounded-md h-8 px-2 text-sm text-muted-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm"
                    >
                      {s}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>

            {/* right: result */}
            <div className="flex flex-col justify-center gap-6 p-7 md:p-8 border-t md:border-t-0 md:border-l border-border text-center">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Based on your {score.toLowerCase()} credit, you could get a car worth up to</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-muted-foreground text-2xl font-medium mb-1">£</span>
                  <span className="text-5xl font-semibold text-foreground tabular-nums leading-none">{affordable.toLocaleString("en-GB")}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {apr}% APR representative · £{budget}/mo over {term} months
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button className="w-full">Get your quote now</Button>
                <p className="text-sm text-muted-foreground">Checking won't affect your credit score.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
