import { Fragment } from "react";
import { HeroOrbit } from "@/components/ui/HeroOrbit";
import { Heading } from "@/components/ui/Heading";
import { DownArrow } from "@/components/ui/icons";
import { HERO_IMAGE, PERSON } from "@/lib/constants";

const COPIES = [0, 1, 2, 3];

export function Hero() {
  return (
    <Fragment>
    <div id="top" aria-hidden="true" />
    <section aria-label="Introduction" className="sticky top-0 z-0">
      <div className="relative h-[100svh] overflow-hidden bg-paper">
        <HeroOrbit />
        <div className="pointer-events-none absolute inset-0 z-40 flex flex-col px-10 md:px-14">
          <p className="pointer-events-auto mt-[calc(4.75rem+clamp(2rem,5vw,3rem))] max-w-[14rem] text-[clamp(1.25rem,1.8vw,1.5rem)] font-medium leading-[1.35] text-ink md:max-w-[18rem]">
            Designer &amp; Developer
          </p>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[58%] z-0 flex -translate-y-1/2 overflow-x-clip overflow-y-visible py-[0.12em] [@media(max-height:450px)]:top-[66%]">
          <div className="hero-marquee-track">
            {[0, 1].map(half => (
              <div key={half} className="flex shrink-0 items-center">
                {COPIES.map(copy => (
                  <Heading key={`${half}-${copy}`} as="span" variant="display-hero" className="block whitespace-nowrap pr-[0.12em] text-[clamp(6rem,26vw,22rem)] leading-[1.15] text-ink [@media(max-height:450px)]:text-[100px]">
                    SOHAM DEY
                  </Heading>
                ))}
              </div>
            ))}
          </div>
        </div>
        <h1 className="sr-only">{PERSON.fullName} — designer and developer</h1>
        <img src={HERO_IMAGE.url} alt={HERO_IMAGE.alt} width={HERO_IMAGE.width} height={HERO_IMAGE.height}
          fetchPriority="high" decoding="async"
          className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-[80%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom md:h-[96%]" />
        <a href="#about" className="absolute bottom-6 right-6 z-30 flex min-h-11 items-center gap-2 text-[11px] font-light uppercase text-muted-label focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:bottom-10 md:right-10">
          Scroll down <DownArrow className="h-3 w-3" strokeWidth={1.5} />
        </a>
      </div>
    </section>
    </Fragment>
  );
}
