import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Ambient decorative arc with a dot travelling along its path (upper-left of the hero). */
export function HeroOrbit() {
  const prefersReduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Full circle so the dot loops seamlessly; only part of it reads on screen.
  const arcPath = "M300 20 A 280 280 0 1 1 299.9 20";

  return (
    <svg
      viewBox="0 0 600 600"
      aria-hidden="true"
      className="pointer-events-none absolute -left-40 -top-28 z-10 h-[520px] w-[520px] overflow-visible text-ink/25 md:-left-44 md:-top-32 md:h-[600px] md:w-[600px]"
    >
      <path
        d={arcPath}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
      {mounted && !prefersReduced ? (
        <circle r="5" fill="currentColor">
          <animateMotion dur="16s" repeatCount="indefinite" path={arcPath} calcMode="linear" />
        </circle>
      ) : <circle cx="300" cy="20" r="5" fill="currentColor" />}
    </svg>
  );
}
