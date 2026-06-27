import { Swap, Refresh } from "../icons";
import { Card } from "@/components/ui/card";

export function PartExchangeCard() {
  return (
    <Card className="flex flex-col justify-center bg-muted rounded-xl border-0 shadow-none gap-0 py-0 min-h-[160px]">
      <div className="flex p-6 px-8 gap-3 justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium text-foreground">Part exchange and refinance</h3>
          <p className="max-w-72 text-muted-foreground">
            Use your current car as a deposit, or refinance your existing agreement to see if you could lower your monthly
            payments.
          </p>
        </div>
        <div className="flex items-center justify-center gap-1 shrink-0 text-border">
          <Swap width={40} height={40} />
          <Refresh width={40} height={40} />
        </div>
      </div>
    </Card>
  );
}
