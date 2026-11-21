import { useEffect, type RefObject } from "react";
import { registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Fade + slide-up entrance for a section's direct children marked with
 * `data-reveal` (§8). Skipped entirely under reduced motion.
 */
export function useSectionReveal(
  scopeRef: RefObject<HTMLElement | null>,
  options: { y?: number; stagger?: number; duration?: number } = {},
) {
  const prefersReduced = usePrefersReducedMotion();
  const { y = 40, stagger = 0.12, duration = 0.8 } = options;

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || prefersReduced) return;

    const { gsap } = registerGsap();
    const targets = scope.querySelectorAll("[data-reveal]");
    if (targets.length === 0) return;

    const context = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scope,
          start: "top 80%",
          once: true,
        },
      });
    }, scope);

    return () => context.revert();
  }, [duration, prefersReduced, scopeRef, stagger, y]);
}
