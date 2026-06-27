import { Calculator } from "../icons";
import { Card } from "@/components/ui/card";

export function RevenueCard() {
  return (
    <Card className="flex flex-col justify-center bg-muted rounded-xl border-0 shadow-none gap-0 py-0 min-h-[160px]">
      <div className="flex p-6 px-8 gap-3 justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium text-foreground">Car finance calculator</h3>
          <p className="max-w-72 text-muted-foreground">
            Estimate your monthly payments before you apply. Choose HP or PCP, adjust your deposit and term, and see your
            monthly cost update instantly.
          </p>
        </div>
        <Calculator width={40} height={40} className="text-border shrink-0" />
      </div>
    </Card>
  );
}
