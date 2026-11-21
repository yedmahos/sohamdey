import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { DiagonalArrow } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { PROJECTS, SOCIAL_LINKS } from "@/lib/constants";
import reactLogo from "@/assets/tech/react.svg";
import typescriptLogo from "@/assets/tech/typescript.svg";
import viteLogo from "@/assets/tech/vite.svg";
import pythonLogo from "@/assets/tech/python.svg";
import htmlLogo from "@/assets/tech/html5.svg";

const TECH_LOGOS: Record<string, string> = {
  React: reactLogo,
  TypeScript: typescriptLogo,
  Vite: viteLogo,
  Python: pythonLogo,
  HTML: htmlLogo,
};

export function MyWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const keyboardNavigation = useRef(false);
  const [activeId, setActiveId] = useState(PROJECTS[0]?.id ?? "");
  useSectionReveal(sectionRef, { y: 24, stagger: 0.08 });
  const github = SOCIAL_LINKS.find(link => link.icon === "github");

  useEffect(() => {
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    const trackPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      keyboardNavigation.current = false;
    };
    const trackKeyboard = (event: KeyboardEvent) => {
      if (["Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        keyboardNavigation.current = true;
      }
    };
    const syncProject = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!pointer || !section) return;
      if (keyboardNavigation.current && section.contains(document.activeElement)) return;
      const row = document.elementFromPoint(pointer.x, pointer.y)?.closest<HTMLElement>("article[data-project-id]");
      const id = row?.dataset['projectId'];
      if (row && section.contains(row) && id) setActiveId(id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(syncProject);
    };
    const clearPointer = () => { pointer = null; };
    window.addEventListener("pointermove", trackPointer, { passive: true });
    window.addEventListener("pointerdown", trackPointer, { passive: true });
    window.addEventListener("keydown", trackKeyboard);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("blur", clearPointer);
    document.documentElement.addEventListener("pointerleave", clearPointer);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", trackPointer);
      window.removeEventListener("pointerdown", trackPointer);
      window.removeEventListener("keydown", trackKeyboard);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("blur", clearPointer);
      document.documentElement.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} aria-labelledby="work-heading" className="work-panel relative z-10 bg-work-surface py-16 text-ink md:py-24">
      <div>
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6 pb-12 md:pb-20">
          <div className="flex flex-nowrap items-end gap-0.5 md:gap-1">
            <h2 id="work-heading" className="work-title font-display text-ink">
              <span className="sr-only">My Work</span>
              <svg aria-hidden="true" viewBox="0 0 1232 407" className="block h-full w-full" fill="currentColor">
                <polygon points="0,407 23,407 80,0 57,0" />
                <text x="101" y="368" fontSize="410" fontWeight="400" textLength="1131" lengthAdjust="spacingAndGlyphs">MY WORK</text>
              </svg>
            </h2>
            <DiagonalArrow className="work-arrow shrink-0 self-end text-about-arrow" />
          </div>
        </div>

        <div className="border-t border-work-line">
          {PROJECTS.map((project, index) => {
            const active = activeId === project.id;
            return (
              <article key={project.id} data-project-id={project.id} data-reveal data-active={active} aria-labelledby={`project-${project.id}`} onMouseEnter={() => {
                if (!keyboardNavigation.current || !sectionRef.current?.contains(document.activeElement)) setActiveId(project.id);
              }} onFocusCapture={() => setActiveId(project.id)} className="group relative grid min-h-32 grid-cols-[24px_108px_minmax(0,1fr)_44px] items-center gap-3 border-b border-work-line text-work-muted transition-[min-height,grid-template-columns,gap,color] duration-1000 ease-apple data-[active=true]:min-h-44 data-[active=true]:grid-cols-[24px_112px_minmax(0,1fr)_44px] data-[active=true]:gap-4 data-[active=true]:text-work-accent sm:min-h-40 sm:grid-cols-[40px_144px_minmax(0,1fr)_64px] sm:gap-6 sm:data-[active=true]:min-h-56 sm:data-[active=true]:grid-cols-[40px_200px_minmax(0,1fr)_64px] sm:data-[active=true]:gap-10 lg:min-h-48 lg:grid-cols-[64px_240px_minmax(0,1fr)_80px] lg:gap-12 lg:data-[active=true]:min-h-64 lg:data-[active=true]:grid-cols-[64px_320px_minmax(0,1fr)_80px] lg:data-[active=true]:gap-20 lg:short:min-h-36 lg:short:grid-cols-[56px_180px_minmax(0,1fr)_64px] lg:short:gap-8 lg:short:data-[active=true]:min-h-44 lg:short:data-[active=true]:grid-cols-[56px_240px_minmax(0,1fr)_64px] lg:short:data-[active=true]:gap-14 max-[360px]:grid-cols-[24px_72px_minmax(0,1fr)_44px] max-[360px]:gap-2 max-[360px]:data-[active=true]:grid-cols-[24px_80px_minmax(0,1fr)_44px] max-[360px]:data-[active=true]:gap-2">
                <span aria-hidden="true" className="font-sans text-base font-medium sm:text-2xl">{String(index + 1).padStart(2, "0")}</span>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} live website (new tab)`} tabIndex={active ? 0 : -1} aria-hidden={!active} className="relative z-10 block aspect-[4/3] w-full overflow-hidden rounded-lg border border-work-line bg-work-line transition-[opacity,transform] duration-[1600ms] ease-apple focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-work-accent motion-reduce:transform-none data-[visible=false]:pointer-events-none data-[visible=false]:translate-y-3 data-[visible=false]:opacity-0 data-[visible=true]:origin-top-right data-[visible=true]:scale-115 data-[visible=true]:overflow-visible data-[visible=true]:opacity-100 sm:data-[visible=true]:origin-center sm:data-[visible=true]:-translate-y-6 sm:data-[visible=true]:scale-125 lg:data-[visible=true]:scale-[1.35] max-[360px]:data-[visible=true]:scale-[1.08]" data-visible={active}>
                  <img src={project.thumbnail} alt={project.thumbnailAlt} width={1440} height={1000} loading="lazy" decoding="async" className={`h-full w-full rounded-lg transition-transform duration-[1600ms] ease-apple motion-reduce:transform-none ${active ? "object-contain" : "object-cover scale-[1.02]"}`} />
                </a>
                <Heading as="h3" id={`project-${project.id}`} variant="section" className="min-w-0 font-project text-[17px] font-medium tracking-normal text-current sm:text-[32px] lg:text-[40px] lg:short:text-[30px]">
                  <Button variant="ghost" aria-expanded={active} aria-controls={`work-details-${project.id}`} onClick={() => setActiveId(project.id)} className="work-project-select min-h-11 w-full justify-start whitespace-normal rounded-none p-0 text-left hover:bg-transparent hover:text-work-accent focus-visible:outline-work-accent">{project.name}</Button>
                </Heading>
                <Button asChild variant="ghost" size="icon" className="h-11 w-11 rounded-full text-current hover:bg-work-fill hover:text-ink group-data-[active=true]:bg-work-fill group-data-[active=true]:text-ink focus-visible:outline-work-accent sm:h-16 sm:w-16 lg:h-20 lg:w-20 lg:short:h-14 lg:short:w-14 [&_svg]:size-7 sm:[&_svg]:size-10 lg:short:[&_svg]:size-8">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name} (new tab)`} title={`Visit ${project.name}`}><ArrowUpRight strokeWidth={1.5} /></a>
                </Button>
                <div id={`work-details-${project.id}`} inert={!active} aria-hidden={!active} className={`col-span-full grid transition-[grid-template-rows,opacity] duration-1000 ease-apple motion-reduce:transition-none sm:col-span-3 sm:col-start-2 ${active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="space-y-5 pb-14 pt-5 sm:pb-8 sm:pt-3 lg:short:space-y-3 lg:short:pb-6 lg:short:pt-2">
                      <p className="text-sm text-work-accent lg:short:text-xs">{project.category}</p>
                      <p className="max-w-[62ch] text-base leading-relaxed text-ink lg:short:line-clamp-2 lg:short:text-sm">{project.description}</p>
                      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                        <ul aria-label={`${project.name} technologies`} className="flex flex-wrap items-center gap-x-5 gap-y-3">
                          {project.technologies.map(technology => (
                            <li key={technology}>
                              <img src={TECH_LOGOS[technology]} alt="" width={24} height={24} loading="lazy" decoding="async" className="h-6 w-6" />
                              <span className="sr-only">{technology}</span>
                            </li>
                          ))}
                        </ul>
                        <Button asChild variant="ghost" size="action" className="border border-work-line text-ink hover:bg-ink hover:text-canvas focus-visible:outline-work-accent"><a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} on GitHub (new tab)`}><Github /> View code</a></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {github && <div className="flex justify-end pt-8">
          <Button asChild variant="ghost" size="action" className="text-work-muted hover:bg-transparent hover:text-work-accent focus-visible:outline-work-accent"><a href={`${github.href}?tab=repositories`} target="_blank" rel="noopener noreferrer">All repositories <ArrowUpRight /></a></Button>
        </div>}
      </div>
    </section>
  );
}