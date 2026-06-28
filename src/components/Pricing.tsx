import { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import NumberFlow from "@number-flow/react";
import { Search, Bank, CreditScore, Clock, Percent, Savings, Car, Shield } from "./icons";

const BUDGET = { min: 50, max: 2000, step: 25 };
const TERMS = [24, 36, 48, 60];
const SCORES = ["Excellent", "Good", "Fair", "Poor", "Bad"];

// Each feature is paired with an icon from our car-finance set, not a generic tick.
const FEATURES = [
  { icon: Search, label: "No credit impact" },
  { icon: Bank, label: "Every UK lender" },
  { icon: CreditScore, label: "Any credit score" },
  { icon: Clock, label: "Decision in minutes" },
  { icon: Percent, label: "No hidden fees" },
  { icon: Savings, label: "No early penalty" },
  { icon: Car, label: "New & used" },
  { icon: Shield, label: "FCA regulated" },
];

// Representative APR by self-reported credit score, calibrated to Zuto's calculator.
const SCORE_APR: Record<string, number> = {
  Excellent: 8.9,
  Good: 8.9,
  Fair: 9.9,
  Poor: 11.6,
  Bad: 13.9,
};

// Reveal-on-scroll: flips `shown` true the first time the element enters the
// viewport, so the house `.appear` fade can be deferred until it loads in.
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      // Hold off until the card is well into view: needs ~25% visible AND to have
      // crossed above the bottom 20% of the viewport, so it doesn't fire on the
      // first sliver peeking in from the bottom edge.
      { threshold: 0.25, rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);
  return [ref, shown] as const;
}

export function Pricing() {
  const [budget, setBudget] = useState(200);
  const [termIdx, setTermIdx] = useState(TERMS.indexOf(48));
  const [score, setScore] = useState(SCORES[0]);
  const term = TERMS[termIdx];
  const apr = SCORE_APR[score];

  const [calcRef, calcShown] = useReveal();
  const [gridRef, gridShown] = useReveal();
  const [exampleRef, exampleShown] = useReveal();

  // Car value we think we could finance = present value of the monthly budget
  // treated as a repayment over the chosen term at the score's representative APR.
  // Rate is compounded effectively (to match Zuto), not as a simple APR/12.
  const monthlyRate = Math.pow(1 + apr / 100, 1 / 12) - 1;
  const carValue = (budget * (1 - Math.pow(1 + monthlyRate, -term))) / monthlyRate;
  const affordable = Math.round(carValue);

  return (
    <section id="pricing" className="py-16 flex flex-col gap-12 scroll-mt-28">
      <div className="w-full max-w-5xl mx-auto px-5">
        <Card
          ref={calcRef}
          className={`bg-muted rounded-3xl border-0 shadow-none p-0 gap-0 overflow-hidden ${calcShown ? "appear" : "opacity-0"}`}
        >
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
                <div className="relative flex w-full p-1 rounded-lg bg-background border border-border">
                  {/* single highlight that slides between options via a CSS transform transition */}
                  <span
                    aria-hidden
                    className="absolute top-1 bottom-1 left-1 rounded-md bg-muted transition-transform duration-300 ease-out"
                    style={{
                      width: `calc((100% - 0.5rem) / ${SCORES.length})`,
                      transform: `translateX(${SCORES.indexOf(score) * 100}%)`,
                    }}
                  />
                  {SCORES.map((s) => {
                    const active = score === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setScore(s)}
                        aria-pressed={active}
                        className="relative z-10 flex-1 rounded-md h-8 px-2 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                      >
                        <span className={`transition-colors ${active ? "text-foreground" : "text-muted-foreground"}`}>
                          {s}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* right: result */}
            <div className="flex flex-col gap-4 p-7 md:p-8 border-t md:border-t-0 md:border-l border-border text-center">
              <div className="flex-1 flex flex-col items-center justify-center gap-2 rounded-lg bg-background p-6">
                <p className="text-sm text-muted-foreground">You could get a car worth</p>
                <NumberFlow
                  value={affordable}
                  format={{ style: "currency", currency: "GBP", maximumFractionDigits: 0 }}
                  className="text-7xl font-bold text-primary leading-none tracking-[-0.025em]"
                />
              </div>

              <Button className="w-full">Get my quote now</Button>
            </div>
          </div>
        </Card>

        {/* what's included — its own band between calculator and the example */}
        <Card
          ref={gridRef}
          className={`bg-muted rounded-3xl border-0 shadow-none mt-4 p-7 md:p-8 ${gridShown ? "appear" : "opacity-0"}`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon width={20} height={20} className="text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* representative example — FCA-required illustration */}
        <Card
          ref={exampleRef}
          className={`bg-muted rounded-3xl border-0 shadow-none mt-4 p-7 md:p-8 gap-3 ${exampleShown ? "appear" : "opacity-0"}`}
        >
          <h3 className="text-sm font-semibold text-foreground">Representative Example</h3>
          <p className="text-sm text-muted-foreground">
            Borrowing £8,000 over 60 months with a representative APR of 18.1% the amount payable would be £198 a month,
            with a total cost of credit of £3,865 and a total amount payable of £11,865.
          </p>
          <p className="text-sm text-muted-foreground">
            Carmonia is a credit broker, not a lender. Our rates start from 8.9% APR. The rate you are offered will
            depend on your individual circumstances.
          </p>
        </Card>
      </div>
    </section>
  );
}
