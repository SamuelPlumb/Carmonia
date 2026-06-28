import type { ReactNode } from "react";
import { Button } from "../Button";
import { ChevronRight, IconBox } from "../icons";

export type Accent = "green" | "sky" | "pink" | "amber";

const ACCENT_TEXT: Record<Accent, string> = {
  green: "text-primary",
  sky: "text-primary",
  pink: "text-primary",
  amber: "text-primary",
};

interface FeatureTextProps {
  accent: Accent;
  icon: ReactNode;
  title: string;
  subtitle: string;
  items: { icon: ReactNode; label: string }[];
}

export function FeatureText({ accent, icon, title, subtitle, items }: FeatureTextProps) {
  return (
    <div className="flex flex-col p-6 px-8 gap-3 items-start">
      <IconBox>{icon}</IconBox>
      <div className="flex flex-col gap-0.5 max-w-72">
        <h3 className={`text-2xl/7 font-medium ${ACCENT_TEXT[accent]}`}>{title}</h3>
        <p className="text-2xl/7 font-medium text-foreground">{subtitle}</p>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-2">
            <span className={`${ACCENT_TEXT[accent]} shrink-0 inline-flex items-center`}>{it.icon}</span>
            <span className="text-sm font-medium text-foreground">{it.label}</span>
          </li>
        ))}
      </ul>
      <Button variant="soft" size="sm" className="gap-1 pr-1.5 mt-1">
        Learn more
        <ChevronRight />
      </Button>
    </div>
  );
}
