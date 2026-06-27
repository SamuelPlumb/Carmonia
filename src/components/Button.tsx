import type { ComponentProps } from "react";
import { Button as UiButton } from "@/components/ui/button";

/**
 * Project-level adapter over the shadcn Button. Keeps the ergonomic
 * primary/secondary/soft + sm/md API (and `href` → anchor via Radix Slot)
 * used across the site, while delegating all styling/behaviour to the
 * shadcn primitive.
 */

type Variant = "primary" | "secondary" | "soft";
type Size = "sm" | "md";

const VARIANT_MAP = { primary: "default", secondary: "secondary", soft: "soft" } as const;

interface ButtonProps extends Omit<ComponentProps<typeof UiButton>, "variant" | "size"> {
  variant?: Variant;
  size?: Size;
  href?: string;
}

export function Button({ variant = "primary", size = "md", href, children, ...props }: ButtonProps) {
  if (href) {
    return (
      <UiButton asChild variant={VARIANT_MAP[variant]} size={size} {...props}>
        <a href={href}>{children}</a>
      </UiButton>
    );
  }
  return (
    <UiButton variant={VARIANT_MAP[variant]} size={size} {...props}>
      {children}
    </UiButton>
  );
}
