import { CreditScore, FactCheck, Groups, Shield, CheckCircle } from "../icons";
import { FeatureText } from "./FeatureText";
import { Card } from "@/components/ui/card";

// Every credit band, shown as accepted — reinforces "lenders for every profile".
const PROFILES = ["Excellent", "Good", "Fair", "Poor", "Very poor", "CCJs & defaults"];

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
      <div className="w-full h-[320px] p-6 px-8 pt-0 flex flex-col justify-center gap-2">
        {PROFILES.map((p) => (
          <div
            key={p}
            className="flex items-center justify-between gap-2 h-10 px-3 rounded-md bg-background border border-foreground/5"
          >
            <span className="text-sm font-medium text-foreground">{p}</span>
            <span className="flex items-center gap-1 text-xs font-medium text-primary">
              <CheckCircle width={16} height={16} />
              Considered
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
