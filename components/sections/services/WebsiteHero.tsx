import type { SiteMock } from "@/lib/content";
import { WorkflowMotion } from "@/components/shared/WorkflowMotion";
import { cn } from "@/lib/utils";
import o from "@/components/shared/optimism.module.css";
import { ServiceHeroActions, ServiceHeroHeadline, type ServiceHeroCopyContent } from "./ServiceHeroCopy";
import { BrowserFrame, SiteDesktop, SitePhone } from "./SiteMock";
import s from "./site.module.css";

type HeroContent = ServiceHeroCopyContent & {
  site: SiteMock;
  phoneBar: string[];
  notesLabel: string;
  notes: { title: string; body: string }[];
  caption: string;
};

// When each annotation appears (ms), after the browser and phone have settled.
const notesAt = [1000, 1200, 1400];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * Website Design & Development hero: the headline across the full width, then an annotated
 * design "stage" where an illustrative site is shown on a desktop browser and a phone, with
 * numbered notes on what the design is doing. On wide screens the copy, call to action and notes
 * sit in a column beside the stage; on narrow screens they read copy, stage, notes. Plays once;
 * reduced motion shows it complete.
 */
export function WebsiteHero({ content }: { content: HeroContent }) {
  const { site, notes } = content;

  return (
    <section aria-labelledby="service-title" className="relative overflow-hidden border-b border-rule">
      <div aria-hidden className={o.atmosphere} />
      <div className="relative mx-auto max-w-6xl px-6 pt-8 pb-14 md:px-8 md:pt-14 md:pb-20">
        <ServiceHeroHeadline content={content} />

        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-12 md:mt-9 lg:mt-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:grid-rows-[auto_1fr] *:min-w-0">
          <ServiceHeroActions content={content} className="lg:col-start-1 lg:row-start-1" />

          <WorkflowMotion
            className={cn(s.stage, "relative m-0 pb-[44%] sm:pb-[17%] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start")}
            labelledBy="site-caption"
            layoutQuery={null}
          >
            <BrowserFrame url="fernwaylandscaping.example" className={cn(s.enterBrowser, "w-[88%] sm:w-[86%]")}>
              <SiteDesktop site={site} pinsAt={[notesAt[0], notesAt[1]]} />
            </BrowserFrame>
            <SitePhone
              site={site}
              bar={content.phoneBar}
              pinAt={notesAt[2]}
              className={cn(s.enterPhone, "absolute right-0 bottom-0 w-[34%] sm:w-[27%]")}
            />
          </WorkflowMotion>

          <div className="-mt-4 lg:col-start-1 lg:row-start-2 lg:mt-0">
            <p id="site-notes-label" className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">
              {content.notesLabel}
            </p>
            <ol aria-labelledby="site-notes-label" className="mt-5 grid gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-1 lg:gap-5">
              {notes.map((note, i) => (
                <li key={note.title} className={cn(s.fade, "flex gap-3.5")} style={delay(notesAt[i])}>
                  <span
                    aria-hidden
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-magenta font-mono text-xs font-bold text-brand-cream"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold leading-snug">{note.title}</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{note.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p id="site-caption" className="mt-6 text-[0.8125rem] text-ink-soft">
              {content.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
