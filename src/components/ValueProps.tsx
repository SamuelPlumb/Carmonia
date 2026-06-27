import type { ReactNode } from "react";
import { Search, Clock, Savings, IconBox } from "./icons";

const PROPS: { icon: ReactNode; lead: string; rest: string }[] = [
  {
    icon: <Search className="text-primary" />,
    lead: "Soft search.",
    rest: "Checking your eligibility won't affect your credit score or leave a mark on your file.",
  },
  {
    icon: <Clock className="text-primary" />,
    lead: "Decision in minutes.",
    rest: "A short online form is all it takes to find out where you stand.",
  },
  {
    icon: <Savings className="text-primary" />,
    lead: "No fees to you.",
    rest: "Our service is completely free — we're paid a commission by the lender, not by you.",
  },
];

export function ValueProps() {
  return (
    <div className="w-full max-w-5xl mx-auto px-5 grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 justify-center">
      {PROPS.map((p) => (
        <div key={p.lead} className="flex flex-col items-center justify-start gap-3 max-w-xs md:max-w-none mx-auto">
          <IconBox>{p.icon}</IconBox>
          <h3 className="text-lg/6 font-medium text-center text-foreground">
            {p.lead} <span className="text-muted-foreground">{p.rest}</span>
          </h3>
        </div>
      ))}
    </div>
  );
}
