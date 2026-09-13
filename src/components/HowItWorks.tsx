import { Badge } from "./SectionHeader";
import { IconBox } from "./icons";
import { Card } from "@/components/ui/card";

function StepCard({ step, lead, rest }: { step: number; lead: string; rest: string }) {
  return (
    <Card className="bg-muted rounded-xl overflow-hidden border-0 shadow-none gap-0 py-0">
      <div className="p-4 md:p-6 flex flex-col items-center gap-3">
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
        <StepCard
          step={1}
          lead="Apply online."
          rest="Tell us a bit about yourself and your budget. We'll give you a quick decision and an approval in principle."
        />
        <StepCard
          step={2}
          lead="Choose your car."
          rest="Pick from any reputable dealer, or browse cars to suit your budget in our members area."
        />
        <StepCard
          step={3}
          lead="Drive away."
          rest="We sort the paperwork with the dealer and lender. You just collect the keys and go."
        />
      </div>
    </section>
  );
}
