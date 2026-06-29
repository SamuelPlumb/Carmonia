import type { ReactNode } from "react";
import {
  CheckCircle,
  CrossCircle,
  PlusCircle,
  Savings,
  Key,
  Clock,
  DollarCircle,
  Speedometer,
  Shield,
  Support,
  Car,
  Refresh,
  Bank,
} from "./icons";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type Cell = "yes" | "no" | "optional";

const TYPES: { name: string; abbr?: string; icon: ReactNode }[] = [
  { name: "Hire Purchase", abbr: "HP", icon: <Car width={28} height={28} /> },
  { name: "Personal Contract Purchase", abbr: "PCP", icon: <Refresh width={28} height={28} /> },
  { name: "Personal Loan", icon: <Bank width={28} height={28} /> },
];

const ROWS: { label: string; icon: ReactNode; cells: [Cell, Cell, Cell] }[] = [
  { label: "Requires initial deposit", icon: <Savings width={20} height={20} />, cells: ["optional", "optional", "no"] },
  { label: "Car is yours at the end of the agreement", icon: <Key width={20} height={20} />, cells: ["yes", "optional", "yes"] },
  { label: "Fixed monthly payments", icon: <Clock width={20} height={20} />, cells: ["yes", "yes", "yes"] },
  { label: "Avoid (final) balloon payment", icon: <DollarCircle width={20} height={20} />, cells: ["yes", "no", "yes"] },
  { label: "Avoid excess mileage charge", icon: <Speedometer width={20} height={20} />, cells: ["yes", "no", "yes"] },
  { label: "Secured against an asset (e.g. a car)", icon: <Shield width={20} height={20} />, cells: ["yes", "yes", "no"] },
  { label: "Support with vehicle issues", icon: <Support width={20} height={20} />, cells: ["yes", "yes", "no"] },
];

function Mark({ cell }: { cell: Cell }) {
  if (cell === "yes") return <CheckCircle className="inline-flex text-primary" />;
  if (cell === "no") return <CrossCircle className="inline-flex text-negative" />;
  // optional — an amber "you can opt in" marker (design-system --optional, drawn
  // from the credit-score dial) that explains itself on hover, mirroring the
  // "limited" tooltip pattern used elsewhere.
  return (
    <Tooltip>
      <TooltipTrigger className="inline-flex cursor-help align-middle outline-none">
        <PlusCircle className="inline-flex text-optional" />
      </TooltipTrigger>
      <TooltipContent>Optional — depends on the finance agreement you choose.</TooltipContent>
    </Tooltip>
  );
}

export function Comparison() {
  return (
    <section className="py-16 flex flex-col gap-12">
      <div className="w-full max-w-3xl mx-auto px-5 flex flex-col items-center text-center gap-5">
        <h2 className="text-4xl text-foreground leading-11 text-balance max-w-lg">Compare car finance types</h2>
        <p className="w-full max-w-md font-medium text-lg/6 text-muted-foreground">
          Hire Purchase, PCP and a personal loan each work a little differently. Here's how the three most common ways to
          finance a car compare.
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto px-5">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[640px] table-fixed border-collapse text-left">
            <colgroup>
              <col style={{ width: "37%" }} />
              <col style={{ width: "21%" }} />
              <col style={{ width: "21%" }} />
              <col style={{ width: "21%" }} />
            </colgroup>
            <thead>
              <tr className="align-top">
                <th className="p-4 pl-0 align-bottom text-sm font-medium text-muted-foreground" scope="col">
                  Finance features
                </th>
                {TYPES.map((type) => (
                  <th key={type.name} className="p-4 align-top" scope="col">
                    <div className="w-full h-full flex flex-col items-center gap-2 text-center">
                      <span className="inline-flex text-foreground">{type.icon}</span>
                      <span className="text-sm font-medium text-foreground leading-snug">
                        {type.name}
                        {type.abbr && <span className="text-muted-foreground"> ({type.abbr})</span>}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-b-0">
                  <th scope="row" className="p-4 pl-0 font-normal align-middle">
                    <div className="flex items-center gap-2 font-medium text-foreground">
                      <span className="text-muted-foreground shrink-0 inline-flex items-center">{row.icon}</span>
                      {row.label}
                    </div>
                  </th>
                  {row.cells.map((cell, ci) => (
                    <td key={ci} className="p-4 text-center align-middle">
                      <Mark cell={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
