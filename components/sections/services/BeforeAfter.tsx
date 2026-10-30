import { ArrowRight } from "lucide-react";
import type { SiteMock } from "@/lib/content";
import { HomeHeading } from "@/components/sections/home/HomeHeading";
import { CompareSlider } from "./CompareSlider";
import { BrowserFrame, SiteDated, SiteDesktop } from "./SiteMock";

type CompareContent = {
  title: string;
  intro: string;
  sliderLabel: string;
  before: string;
  after: string;
  beforeSite: React.ComponentProps<typeof SiteDated>["site"];
  problemsLabel: string;
  problems: { problem: string; fix: string }[];
  caption: string;
};

/**
 * The same illustrative business's website after and before. "After" sits on the left so the
 * starting midpoint shows its headline and button against the dated site's text.
 */
export function BeforeAfter({ id, content, site }: { id: string; content: CompareContent; site: SiteMock }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 bg-deep-cream">
      <div className="mx-auto max-w-6xl px-6 py-18 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end *:min-w-0">
          <HomeHeading id={`${id}-title`}>{content.title}</HomeHeading>
          <p className="max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-soft md:text-lg">{content.intro}</p>
        </div>

        <figure aria-labelledby={`${id}-caption`} className="m-0 mt-10 md:mt-12">
          <BrowserFrame url="fernwaylandscaping.example" className="mx-auto max-w-5xl">
            <CompareSlider
              left={<SiteDesktop site={site} />}
              right={<SiteDated site={content.beforeSite} />}
              label={content.sliderLabel}
              leftLabel={content.after}
              rightLabel={content.before}
            />
          </BrowserFrame>
          <figcaption id={`${id}-caption`} className="mx-auto mt-4 max-w-5xl text-[0.8125rem] text-ink-soft">
            {content.caption}
          </figcaption>
        </figure>

        <h3 id={`${id}-problems`} className="mt-12 font-mono text-[0.6875rem] font-normal uppercase tracking-[0.12em] text-ink-soft">
          {content.problemsLabel}
        </h3>
        <ul aria-labelledby={`${id}-problems`} className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-[#e6dcbc] bg-[#e6dcbc] sm:grid-cols-2 lg:grid-cols-5">
          {content.problems.map((item) => (
            <li key={item.problem} className="bg-paper p-5 sm:last:col-span-2 lg:last:col-span-1">
              <p className="text-[0.9rem] text-ink-soft line-through decoration-coral-ink/60">
                <span className="sr-only">{content.before}: </span>
                {item.problem}
              </p>
              <p className="mt-2.5 flex gap-2 font-semibold leading-snug">
                <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-coral-ink" />
                <span>
                  <span className="sr-only">{content.after}: </span>
                  {item.fix}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
