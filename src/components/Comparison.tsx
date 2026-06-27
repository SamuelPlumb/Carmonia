import type { ReactNode } from "react";
import {
  Logo,
  CheckCircle,
  MinusCircle,
  CrossCircle,
  Search,
  Handshake,
  CreditScore,
  Car,
  Savings,
  Percent,
  Clock,
  Swap,
  Support,
  Storefront,
  Bank,
  Direct,
} from "./icons";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type Cell = "yes" | "partial" | "no";

const TOOLS = ["Carmonia", "Dealer finance", "Bank loan", "Going direct"] as const;

const ROWS: { label: string; icon: ReactNode; cells: [Cell, Cell, Cell, Cell] }[] = [
  { label: "Soft search (no credit impact)", icon: <Search width={16} height={16} />, cells: ["yes", "partial", "no", "no"] },
  { label: "Panel of multiple lenders", icon: <Handshake width={16} height={16} />, cells: ["yes", "partial", "no", "partial"] },
  { label: "Bad credit considered", icon: <CreditScore width={16} height={16} />, cells: ["yes", "partial", "no", "partial"] },
  { label: "Buy from any dealer", icon: <Car width={16} height={16} />, cells: ["yes", "no", "yes", "yes"] },
  { label: "No fees to you", icon: <Savings width={16} height={16} />, cells: ["yes", "partial", "yes", "yes"] },
  { label: "HP and PCP options", icon: <Percent width={16} height={16} />, cells: ["yes", "yes", "no", "partial"] },
  { label: "Decision in minutes", icon: <Clock width={16} height={16} />, cells: ["yes", "partial", "no", "no"] },
  { label: "Part exchange welcome", icon: <Swap width={16} height={16} />, cells: ["yes", "yes", "no", "partial"] },
  { label: "Dedicated UK support", icon: <Support width={16} height={16} />, cells: ["yes", "partial", "partial", "no"] },
];

function Mark({ cell }: { cell: Cell }) {
  if (cell === "yes") return <CheckCircle className="inline-flex text-primary" />;
  const icon =
    cell === "partial" ? (
      <MinusCircle className="inline-flex text-primary" />
    ) : (
      <CrossCircle className="inline-flex text-muted-foreground" />
    );
  const text = cell === "partial" ? "Limited — depends on the dealer or lender." : "Not available.";
  return (
    <Tooltip>
      <TooltipTrigger className="inline-flex cursor-help align-middle outline-none">{icon}</TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  );
}

const TOOL_LOGOS: Record<string, ReactNode> = {
  Carmonia: <Logo height={28} className="text-foreground" />,
  "Dealer finance": <Storefront width={28} height={28} className="text-muted-foreground" />,
  "Bank loan": <Bank width={28} height={28} className="text-muted-foreground" />,
  "Going direct": <Direct width={28} height={28} className="text-muted-foreground" />,
};

export function Comparison() {
  return (
    <section className="py-16 flex flex-col gap-12">
      <div className="w-full max-w-3xl mx-auto px-5 flex flex-col items-center text-center gap-5">
        <h2 className="text-4xl text-foreground leading-11 text-balance max-w-lg">How Carmonia compares</h2>
        <p className="w-full max-w-md font-medium text-lg/6 text-muted-foreground">
          See how applying with Carmonia stacks up against the other ways to finance a car.
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto px-5">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[640px] table-fixed border-collapse text-left">
            <colgroup>
              <col style={{ width: "40%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <thead>
              <tr className="align-top">
                <th className="p-4" />
                {TOOLS.map((tool) => (
                  <th key={tool} className="p-0 align-top" scope="col">
                    <div
                      className={`w-full h-full p-4 flex flex-col items-center gap-2 text-sm font-medium text-foreground ${
                        tool === "Carmonia" ? "bg-background border-2 border-primary rounded-t-3xl border-b-0" : ""
                      }`}
                    >
                      {TOOL_LOGOS[tool]}
                      {tool}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, ri) => (
                <tr key={row.label} className="border-b border-border last:border-b-0">
                  <th scope="row" className="p-4 pl-0 font-normal align-middle">
                    <div className="flex items-center gap-2 font-medium text-foreground">
                      <span className="text-muted-foreground shrink-0">{row.icon}</span>
                      {row.label}
                    </div>
                  </th>
                  {row.cells.map((cell, ci) => {
                    const isCarmonia = ci === 0;
                    const isLast = ri === ROWS.length - 1;
                    return (
                      <td
                        key={ci}
                        className={`p-4 relative text-center align-middle ${
                          isCarmonia ? "bg-background" : ""
                        } ${isCarmonia && isLast ? "rounded-b-3xl" : ""}`}
                      >
                        {isCarmonia && (
                          <div
                            className={`absolute top-0 left-0 right-0 border-2 border-primary pointer-events-none z-10 border-t-0 ${
                              isLast ? "bottom-0 rounded-b-3xl" : "border-b-0 -bottom-px"
                            }`}
                          />
                        )}
                        <Mark cell={cell} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
