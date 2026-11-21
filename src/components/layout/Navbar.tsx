import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, RESUME_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar({ isPastHero = false }: { isPastHero?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  useEffect(() => { if (isPastHero) setMenuOpen(false); }, [isPastHero]);
  useEffect(() => {
    const about = document.getElementById("about");
    if (!about) return;
    const update = () => {
      const r = about.getBoundingClientRect();
      setOverDark(r.top <= 70 && r.bottom >= 70);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-6">
      <nav aria-label="Primary" className={cn(
        "mx-auto flex items-center justify-between rounded-pill border border-canvas/40 bg-gradient-to-b from-canvas/10 to-canvas/0 px-6 py-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-[max-width] duration-150 ease-out md:px-8",
        isPastHero ? "max-w-[420px]" : "max-w-[1440px]",
      )}>
        <a href="#top" className={cn("text-[15px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4", overDark ? "text-canvas focus-visible:outline-canvas" : "text-ink focus-visible:outline-ink")}>{isPastHero ? "sd." : "SOHAM DEY."}</a>
        {!isPastHero && <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(link => <li key={link.href}><a href={link.href} className={cn("text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4", overDark ? "text-canvas/80 hover:text-canvas focus-visible:outline-canvas" : "text-ink/80 hover:text-ink focus-visible:outline-ink")}>{link.label}</a></li>)}
        </ul>}
        <div className="flex items-center gap-3">
          <Button asChild variant="portfolio" className={cn("h-11 px-4", overDark && "border-canvas/40 text-canvas hover:bg-canvas hover:text-ink")}><a href={RESUME_URL} target="_blank" rel="noopener noreferrer">Resume</a></Button>
          {!isPastHero && <Button variant="ghost" className={cn("h-11 w-11 p-0 md:hidden", overDark && "text-canvas")} onClick={() => setMenuOpen(open => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X /> : <Menu />}
          </Button>}
        </div>
      </nav>
      {menuOpen && <ul id="mobile-navigation" className="mx-auto mt-2 rounded-xl border border-canvas/50 bg-canvas/30 p-6 backdrop-blur-xl backdrop-saturate-150 shadow-nav md:hidden">
        {NAV_LINKS.map(link => <li key={link.href}><a href={link.href} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center text-base focus-visible:outline-2 focus-visible:outline-ink">{link.label}</a></li>)}
      </ul>}
    </header>
  );
}
