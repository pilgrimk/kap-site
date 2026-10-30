import Image from "next/image";
import type { ABOUT_PAGE } from "@/lib/content";
import { cn } from "@/lib/utils";
import o from "@/components/shared/optimism.module.css";
import { ServiceHeroActions, ServiceHeroHeadline } from "../services/ServiceHeroCopy";
import { serviceIcons } from "../services/icons";
import s from "./about.module.css";

type HeroContent = (typeof ABOUT_PAGE)["hero"];

// Row centres of the three-row columns, in the 100x100 box the curves are drawn in.
const rows = [100 / 6, 50, 500 / 6];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * About hero: the headline across the full width, then the copy beside a map of where KAP comes
 * from. Kevin's career (labelled as his) feeds into KAP, which feeds the small business's
 * outcomes. Plays once; reduced motion shows it complete.
 */
export function AboutHero({ content }: { content: HeroContent }) {
  const { map } = content;

  return (
    <section aria-labelledby="service-title" className="relative overflow-hidden border-b border-rule">
      <div aria-hidden className={o.atmosphere} />
      <div className="relative mx-auto max-w-6xl px-6 pt-8 pb-14 md:px-8 md:pt-14 md:pb-20">
        <ServiceHeroHeadline content={content} />

        <div className="mt-6 grid grid-cols-1 items-start gap-x-14 gap-y-12 md:mt-9 lg:mt-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] *:min-w-0">
          <ServiceHeroActions content={content} />

          <figure aria-labelledby="about-map-caption" className="m-0">
            <div className="mb-4 hidden grid-cols-[36%_28%_36%] items-end md:grid">
              <p>
                <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">
                  {map.careerLabel}
                </span>
                <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-soft">{map.careerNote}</span>
              </p>
              <span />
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-coral-ink">{map.outcomesLabel}</p>
            </div>

            <div className={s.board}>
              <svg aria-hidden className={s.lines} viewBox="0 0 100 100" preserveAspectRatio="none">
                {rows.map((y, i) => (
                  <path
                    key={`in-${y}`}
                    d={`M36 ${y} C 44 ${y}, 42 50, 50 50`}
                    pathLength={1}
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    className={cn(s.draw, "stroke-brand-charcoal/30")}
                    strokeWidth={1.5}
                    style={delay(420 + i * 60)}
                  />
                ))}
                {rows.map((y, i) => (
                  <path
                    key={`out-${y}`}
                    d={`M50 50 C 58 50, 56 ${y}, 64 ${y}`}
                    pathLength={1}
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    className={cn(s.draw, "stroke-coral-ink/60")}
                    strokeWidth={1.5}
                    style={delay(1000 + i * 60)}
                  />
                ))}
              </svg>

              {/* From 48rem the lists themselves are the board's columns (see about.module.css) */}
              <div className="md:contents">
                <p className="mb-3 text-center font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft md:hidden">
                  {map.careerLabel}
                </p>
                <ul className={s.column}>
                  {map.career.map((item, i) => (
                    <li key={item.field} className={cn(s.row, s.rise)} style={delay(100 + i * 90)}>
                      <div className={cn(s.chip, s.career, "md:mr-1")}>
                        <span className="text-[0.9375rem] font-semibold leading-snug md:text-[1.05rem]">{item.field}</span>
                        <span className="hidden text-[0.8125rem] leading-snug text-brand-cream/70 md:block">{item.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className={cn(s.rise, "mt-3 text-center text-[0.8125rem] text-ink-soft md:hidden")} style={delay(380)}>
                  {map.careerNote}
                </p>
              </div>

              <div className={cn(s.hubWrap, s.pop)} style={delay(800)}>
                <div className={s.hub}>
                  <Image src="/logo.png" alt="" width={799} height={824} className="h-auto w-10 md:w-14" />
                </div>
                <p className={cn(s.hubLabel, "font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em]")}>
                  {map.hub}
                </p>
              </div>

              <div className="md:contents">
                <p className="mb-3 text-center font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-coral-ink md:hidden">
                  {map.outcomesLabel}
                </p>
                <ul className={s.column}>
                  {map.outcomes.map((item, i) => {
                    const Icon = serviceIcons[item.icon];
                    return (
                      <li key={item.text} className={cn(s.row, s.rise)} style={delay(1250 + i * 90)}>
                        <div className={cn(s.chip, s.outcome, "md:ml-1")}>
                          <span
                            aria-hidden
                            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-deep-cream text-coral-ink md:size-8 md:rounded-[9px]"
                          >
                            <Icon className="size-4" />
                          </span>
                          <span className="text-[0.9375rem] font-semibold leading-snug md:text-[1.05rem]">{item.text}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <figcaption id="about-map-caption" className="mt-6 text-[0.8125rem] text-ink-soft md:mt-10">
              {content.caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
