import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";
import { CustomEase } from "gsap/CustomEase";
import { OrganizationStrip } from "./OrganizationStrip";

/**
 * About — black block that rises over the sticky hero as the page scrolls
 * (§2.3, §7.2), producing the signature bottom-to-top cover reveal.
 */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { gsap } = registerGsap();
    gsap.registerPlugin(CustomEase);
    const settleEase = CustomEase.create("about-settle", "0.22,1,0.36,1");
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const title = section.querySelector("[data-about-title]");
      const body = section.querySelector("[data-about-body]");
      if (!title || !body) return;
      const styles = getComputedStyle(section);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          // "top 25%" so the reveal has already played when arriving via the
          // navbar anchor (the section lands 112px below the viewport top).
          start: "top 25%",
          toggleActions: "play none none reverse",
        },
      });
      timeline.fromTo(title,
        { y: window.innerWidth * 0.04, color: styles.getPropertyValue("--about-title-start").trim() },
        { y: 0, color: styles.getPropertyValue("--canvas").trim(), duration: 0.75, ease: settleEase }, 0);
      timeline.fromTo(body,
        { opacity: 0, y: window.innerWidth * 0.015 },
        { opacity: 1, y: 0, duration: 0.7, ease: settleEase }, 0.18);
    }, section);
    return () => media.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="relative z-10 bg-ink text-canvas"
    >
      <div className="about-panel">
      <h2 id="about-heading" data-about-title className="about-title font-display text-canvas">
        <span className="sr-only">About</span>
        <svg aria-hidden="true" viewBox="0 0 866 407" className="block h-full w-full" fill="currentColor">
          <polygon points="0,407 23,407 80,0 57,0" />
          <text x="101" y="368" fontSize="410" fontWeight="400" textLength="765" lengthAdjust="spacingAndGlyphs">ABOUT</text>
        </svg>
      </h2>
      <div data-about-body className="about-body">
        <svg aria-hidden="true" viewBox="0 0 175 175" className="about-arrow text-about-arrow" fill="currentColor">
          <polygon points="22,0 175,0 175,153 150,153 150,43 18,175 0,157 132,25 22,25" />
        </svg>
        <div className="about-copy">
          <blockquote className="about-biography text-about-copy">
            &ldquo;I build software that people use in their daily work. At KIIT, I led a team that helped over 60 rural families replace paper logbooks with an app for tracking their cattle’s health. I’ve also trained machine learning models to spot patterns in financial fraud and worked alongside a startup founder to launch campaigns.&rdquo;
          </blockquote>
          <p className="about-availability text-process-muted">
            Currently available as intern.
          </p>
        </div>
      </div>
      </div>
      <OrganizationStrip />
    </section>
  );
}
