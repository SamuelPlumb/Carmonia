import { useRef, useState } from "react";
import { Car, BadgeCheck, FactCheck, BrandLogo } from "../icons";
import { FeatureText } from "./FeatureText";
import { useFeatureTick } from "./featureTick";
import { Card } from "@/components/ui/card";

type Profile = {
  brand: string; // marque — keys the logo asset (public/images/<brand>.png)
  name: string; // car model (display)
  price: string; // listing price
  year: string; // registration year
};

// Interleaved by brand so the visible window shows a varied mix straight away
// (the feed seeds the first MAX_ROWS in order, then cycles through the rest).
const PROFILES: Profile[] = [
  { brand: "Volkswagen", name: "Volkswagen Golf", price: "£14,995", year: "2020" },
  { brand: "BMW", name: "BMW 3 Series", price: "£17,995", year: "2020" },
  { brand: "Tesla", name: "Tesla Model 3", price: "£17,995", year: "2021" },
  { brand: "Ford", name: "Ford Fiesta", price: "£9,995", year: "2020" },
  { brand: "Mercedes-Benz", name: "Mercedes-Benz A Class", price: "£18,495", year: "2021" },
  { brand: "Hyundai", name: "Hyundai Tucson", price: "£19,995", year: "2022" },
  { brand: "Kia", name: "Kia Sportage", price: "£18,995", year: "2022" },
  { brand: "Nissan", name: "Nissan Qashqai", price: "£15,995", year: "2021" },
  { brand: "Audi", name: "Audi A3", price: "£17,495", year: "2021" },
  { brand: "Toyota", name: "Toyota Yaris", price: "£14,495", year: "2022" },
  { brand: "Land Rover", name: "Land Rover Range Rover Evoque", price: "£22,995", year: "2021" },
  { brand: "MINI", name: "MINI Cooper", price: "£11,495", year: "2019" },
  { brand: "Vauxhall", name: "Vauxhall Corsa", price: "£9,495", year: "2021" },
  { brand: "Ford", name: "Ford Focus", price: "£10,995", year: "2019" },
  { brand: "BMW", name: "BMW 1 Series", price: "£15,495", year: "2020" },
  { brand: "Volkswagen", name: "Volkswagen Polo", price: "£11,495", year: "2020" },
  { brand: "Mercedes-Benz", name: "Mercedes-Benz C Class", price: "£18,995", year: "2020" },
  { brand: "Nissan", name: "Nissan Juke", price: "£11,995", year: "2020" },
  { brand: "Ford", name: "Ford Puma", price: "£13,495", year: "2021" },
  { brand: "Vauxhall", name: "Vauxhall Astra", price: "£9,995", year: "2019" },
];

// Insert-at-top feed (mirrors the visitors.now realtime list): keep `ROW_H` in
// sync with the `feed-in` keyframe in index.css. A new row arrives on each shared
// feature tick (see featureTick.ts), in lock-step with the credit-score dial.
const ROW_H = 44;
const ENTER_MS = 560;
const MAX_ROWS = 9; // fills the 320px window with a couple sliding under the fade

type FeedRow = { id: number; fresh: boolean; profile: Profile };

function Row({ row }: { row: FeedRow }) {
  const p = row.profile;
  return (
    <div
      className="w-full flex items-center shrink-0 gap-3 overflow-hidden px-4 md:px-8"
      style={{
        height: ROW_H,
        ...(row.fresh ? { animation: `feed-in ${ENTER_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both` } : null),
      }}
    >
      <BrandLogo make={p.brand} />
      <div className="flex-1 flex items-baseline gap-2 overflow-hidden min-w-0">
        <span className="text-sm font-medium truncate text-foreground">{p.name}</span>
        <span className="hidden md:inline shrink-0 text-xs text-muted-foreground">{p.year}</span>
      </div>
      <span className="hidden md:inline w-16 shrink-0 text-right text-[13px] font-bold text-primary">{p.price}</span>
      <span className="shrink-0 inline-flex h-6 items-center gap-1 rounded-md pl-1.5 pr-2 text-xs bg-background border border-foreground/10 text-foreground">
        <BadgeCheck className="text-primary" width={14} height={14} />
        Approved
      </span>
    </div>
  );
}

export function ProfilesCard() {
  // Seed a full window so the card never flashes empty; seeded rows don't animate.
  const [rows, setRows] = useState<FeedRow[]>(() =>
    Array.from({ length: MAX_ROWS }, (_, i) => ({
      id: i,
      fresh: false,
      profile: PROFILES[i % PROFILES.length],
    })),
  );
  const next = useRef(MAX_ROWS);

  // Add a row on the shared feature tick (in lock-step with the credit dial).
  useFeatureTick(() => {
    setRows((prev) => {
      const row: FeedRow = {
        id: next.current,
        fresh: true,
        profile: PROFILES[next.current % PROFILES.length],
      };
      next.current += 1;
      return [row, ...prev].slice(0, MAX_ROWS);
    });
  });

  return (
    <Card className="flex flex-col bg-muted rounded-xl min-h-[280px] overflow-hidden border-0 shadow-none gap-0 py-0">
      <FeatureText
        accent="pink"
        icon={<Car width={20} height={20} className="text-primary" />}
        title="Find your dream car"
        subtitle="Get approved in principle, then choose a car you love."
        items={[
          { icon: <BadgeCheck width={20} height={20} />, label: "Buy from any reputable dealer" },
          { icon: <FactCheck width={20} height={20} />, label: "Free vehicle and history check" },
          { icon: <Car width={20} height={20} />, label: "Over 100,000 cars in our members area" },
        ]}
      />
      <div className="w-full h-[320px] relative overflow-hidden mask-fade-b">
        <div className="flex flex-col">
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </div>
      </div>
    </Card>
  );
}
