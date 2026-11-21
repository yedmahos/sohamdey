import { useEffect, useRef, useState } from "react";
import { ORGANIZATION_LOGOS } from "@/lib/organization-logos";

/** Document-flow band; horizontal motion is independent of page scrolling. */
export function OrganizationStrip() {
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(3);

  useEffect(() => {
    const band = bandRef.current;
    const track = trackRef.current;
    const sequence = track?.firstElementChild;
    if (!band || !track || !(sequence instanceof HTMLElement)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    const synchronize = () => {
      const progress = animation?.effect?.getComputedTiming().progress ?? 0;
      animation?.cancel();
      animation = undefined;
      if (preference.matches) return;
      const width = sequence.getBoundingClientRect().width;
      if (!width) return;
      setCopies(Math.max(3, Math.ceil(band.clientWidth / width) + 2));
      const duration = (width / 24) * 1000;
      animation = track.animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(-${width}px)` }],
        { duration, iterations: Infinity, easing: "linear" },
      );
      animation.currentTime = progress * duration;
    };
    const observer = new ResizeObserver(synchronize);
    observer.observe(band);
    observer.observe(sequence);
    preference.addEventListener("change", synchronize);
    synchronize();
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", synchronize);
      animation?.cancel();
    };
  }, []);

  return (
    <div ref={bandRef} className="organization-band bg-ink" data-organization-band>
      <div ref={trackRef} className="organization-track">
        {Array.from({ length: copies }, (_, copy) => (
          <div key={copy} className="organization-sequence" aria-hidden={copy > 0 ? true : undefined}>
            {ORGANIZATION_LOGOS.map((logo) => logo.url ? (
              <img key={logo.name} src={logo.url} alt={copy === 0 ? logo.name : ""}
                className={`organization-mark ${logo.size}`} decoding="async" draggable={false} />
            ) : null)}
          </div>
        ))}
      </div>
    </div>
  );
}