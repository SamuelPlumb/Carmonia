import { Badge as UiBadge } from "@/components/ui/badge";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  titleClassName?: string;
  maxTitle?: string;
}

export function Badge({ children }: { children: string }) {
  return (
    <UiBadge variant="secondary" className="rounded-sm bg-muted text-muted-foreground h-6 px-2 text-sm font-medium">
      {children}
    </UiBadge>
  );
}

export function SectionHeader({ badge, title, subtitle, titleClassName, maxTitle = "max-w-lg" }: SectionHeaderProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-5 flex flex-col items-center text-center gap-5">
      <Badge>{badge}</Badge>
      <h2 className={titleClassName ?? `text-4xl text-foreground text-balance ${maxTitle}`}>
        {title}
      </h2>
      <p className="w-full max-w-md font-medium text-lg/6 text-muted-foreground">{subtitle}</p>
    </div>
  );
}
