import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable heading component (§4 fluid display type).
 * Keeps heading styles consistent project-wide by mapping a small set of
 * variants to the shared typography tokens defined in src/styles.css.
 */
export type HeadingVariant =
  | "display-hero"
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "section"
  | "cta"
  | "label";

const VARIANT_CLASSES: Record<HeadingVariant, string> = {
  "display-hero": "type-display-hero",
  "display-xl": "type-display-xl",
  "display-lg": "type-display-lg",
  "display-md": "type-display-md",
  // Bold section-intro heading used inside two-column section headers.
  section:
    "text-[32px] font-bold leading-[1.15] tracking-tight text-ink md:text-[40px]",
  // Thin geometric CTA heading ("Let's work together").
  cta: "font-sans text-[40px] font-normal leading-none tracking-normal md:text-[56px] xl:text-[80px]",
  label: "type-label",
};

type HeadingProps = {
  /** Rendered element/tag. Defaults to "h2". */
  as?: ElementType;
  variant?: HeadingVariant;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>;

export function Heading({
  as: Tag = "h2",
  variant = "display-xl",
  className,
  children,
  ...rest
}: HeadingProps) {
  return (
    <Tag className={cn(VARIANT_CLASSES[variant], className)} {...rest}>
      {children}
    </Tag>
  );
}
