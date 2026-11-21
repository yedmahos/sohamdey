import { useEffect, type ReactNode } from "react";
import { registerGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Lenis smooth scroll (§8), synced to GSAP ScrollTrigger. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    void (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const { ScrollTrigger } = registerGsap();
      // Refreshes always start at the hero: strip any "#section" hash before
      // Lenis reads it, otherwise its anchor handling scrolls back down.
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
        window.scrollTo(0, 0);
      }
      const instance = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        // Same-page "#" links (nav, back-to-top) glide instead of jumping.
        // No offset here: scroll-padding-top already applies, and a Lenis
        // offset stacks on top of it, landing the section half a screen low.
        anchors: true,
      });
      lenis = instance;

      instance.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        instance.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, [prefersReduced]);

  return <>{children}</>;
}
