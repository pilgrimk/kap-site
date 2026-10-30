import type { ABOUT_PAGE } from "@/lib/content";
import { HomeHeading } from "../home/HomeHeading";
import { serviceIcons } from "../services/icons";

type WhyContent = (typeof ABOUT_PAGE)["why"];

/** The problem KAP exists for, then the mission as the section's typographic statement. */
export function AboutWhy({ content }: { content: WhyContent }) {
  return (
    <section aria-labelledby="why-title" className="bg-deep-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-x-18 *:min-w-0">
          <div>
            <HomeHeading id="why-title" className="max-w-[18ch]">
              {content.title}
            </HomeHeading>
            <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-[1.6] text-ink-soft md:text-[1.15rem]">
              {content.intro}
            </p>
          </div>
          <ul className="grid gap-6 self-end">
            {content.problems.map((problem) => {
              const Icon = serviceIcons[problem.icon];
              return (
                <li key={problem.title} className="flex gap-4">
                  <span
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-paper text-coral-ink"
                  >
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold leading-snug">{problem.title}</h3>
                    <p className="mt-1 leading-relaxed text-ink-soft">{problem.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <figure className="mt-16 border-t border-brand-charcoal/15 pt-10 md:mt-20 md:pt-12">
          <figcaption className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-magenta md:text-xs">
            {content.missionLabel}
          </figcaption>
          <p className="mt-5 max-w-[30ch] font-display text-[clamp(1.6rem,1.1rem+1.9vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.015em] text-balance">
            {content.mission}
          </p>
        </figure>
      </div>
    </section>
  );
}
