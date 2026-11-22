import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { MyWork } from "@/components/sections/MyWork";
import { FooterCTA } from "@/components/sections/FooterCTA";

const TITLE = "Soham Dey — Freelance Designer & Developer";
const DESCRIPTION =
  "Portfolio of Soham Dey, a freelance product designer and developer crafting digital products and brands from define to deliver.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "soham dey" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsPastHero(window.scrollY > window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <SmoothScrollProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>
      <Navbar isPastHero={isPastHero} />
      <main>
        <Hero />
        <About />
        <MyWork />
      </main>
      <FooterCTA />
    </SmoothScrollProvider>
  );
}
