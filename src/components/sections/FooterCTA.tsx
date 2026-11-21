import { useRef } from "react";
import {
  DiagonalArrow,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { CONTACT_URL, EMAIL, PERSON, SOCIAL_LINKS } from "@/lib/constants";

/** Closing CTA + footer (§2.7). */
export function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      aria-labelledby="cta-heading"
      className="relative z-10 bg-paper px-6 py-16 md:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <div
          data-reveal
          className="flex flex-nowrap items-center gap-3 sm:gap-6 xl:gap-12"
        >
          <DiagonalArrow
            className="h-[calc(clamp(1.05rem,6vw,2.5rem)*1.8)] w-[calc(clamp(1.05rem,6vw,2.5rem)*1.8)] shrink-0 md:h-[5.85rem] md:w-[5.85rem] xl:h-[9rem] xl:w-[9rem]"
            strokeWidth={7}
          />

          <Heading
            id="cta-heading"
            variant="cta"
            className="text-[clamp(1.05rem,6vw,2.5rem)] leading-[0.9] md:text-[3.25rem] xl:text-[5rem]"
          >
            Let&rsquo;s work
            <br />
            together
          </Heading>

          <Button
            asChild
            variant="contact"
            size="action"
            className="ml-auto shrink-0 px-3 sm:px-6"
          >
            <a href={CONTACT_URL} target="_blank" rel="noreferrer noopener">
              <span>
                <span className="hidden sm:inline">Message on </span>WhatsApp
              </span>
              <ArrowUpRight />
            </a>
          </Button>
        </div>

        <hr className="mt-12 border-t border-hairline" />

        <Heading
          as="p"
          data-reveal
          variant="display-xl"
          className="mt-12 w-full text-center font-light text-[calc((100vw-3rem)/10.2)] md:text-[min(calc((100vw-8rem)/10.2),128px)]"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="whitespace-nowrap lowercase transition-colors duration-300 hover:text-work-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-work-accent"
          >
            {EMAIL}
          </a>
        </Heading>

        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-ink">
            &copy; {new Date().getFullYear()} {PERSON.fullName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={link.label}
                  className="inline-flex h-11 w-11 items-center justify-center text-ink transition-opacity duration-150 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  {link.icon === "github" && <GitHubIcon />}
                  {link.icon === "instagram" && <InstagramIcon />}
                  {link.icon === "linkedin" && <LinkedInIcon />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
