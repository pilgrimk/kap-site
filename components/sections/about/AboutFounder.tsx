import Image from "next/image";
import type { ABOUT_PAGE } from "@/lib/content";
import { cn } from "@/lib/utils";
import o from "@/components/shared/optimism.module.css";
import { HomeHeading } from "../home/HomeHeading";

type FounderContent = (typeof ABOUT_PAGE)["founder"];

/**
 * Kevin Pilgrim. No approved photograph exists (brief B5), so a typographic panel carries the
 * section instead of a portrait; nothing stands in for his likeness. Career facts are labelled as
 * his career, never as KAP's history or client work.
 */
export function AboutFounder({ id, content }: { id: string; content: FounderContent }) {
  return (
    <section id={id} aria-labelledby="founder-title" className="scroll-mt-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-18 *:min-w-0">
        <div className="lg:col-start-2 lg:row-start-1">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-coral-ink md:text-xs">
            {content.eyebrow}
          </p>
          <HomeHeading id="founder-title" className="mt-4">
            {content.name}
          </HomeHeading>
          <div className="mt-6 grid max-w-[60ch] gap-5 text-[1.05rem] leading-[1.65] text-ink-soft md:text-[1.1rem]">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-10 text-sm font-semibold text-brand-magenta">{content.careerLabel}</p>
          <dl className="mt-4 grid gap-5 border-t border-rule pt-5">
            {content.career.map((item) => (
              <div key={item.field} className="grid gap-1 md:grid-cols-[9.5rem_minmax(0,1fr)] md:items-baseline md:gap-4">
                <dt className="font-display text-[1.2rem] font-semibold tracking-[-0.01em]">{item.field}</dt>
                <dd className="leading-normal text-ink-soft">{item.fact}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[0.8125rem] text-ink-soft">{content.careerNote}</p>
        </div>

        <div
          className={cn(
            "relative order-first flex flex-col justify-between gap-12 overflow-hidden rounded-[20px] bg-brand-charcoal p-7 text-brand-cream md:p-10 lg:sticky lg:top-28 lg:col-start-1 lg:row-start-1 lg:min-h-[30rem] lg:self-start",
            o.accentEdge,
          )}
        >
          {/* Faint mark in the corner: the logo's own node graph, not a likeness */}
          <Image
            src="/logo.png"
            alt=""
            width={799}
            height={824}
            className="pointer-events-none absolute -right-14 -bottom-16 h-auto w-64 opacity-[0.08]"
          />
          <p className="relative">
            <span className="block font-display text-[clamp(5rem,3.5rem+6vw,8.5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-brand-amber">
              {content.years}
            </span>
            <span className="mt-3 block max-w-[16ch] text-[1.15rem] leading-snug text-brand-cream/80">
              {content.yearsLabel}
            </span>
          </p>
          <p className="relative border-t border-brand-cream/15 pt-5">
            <span className="block font-display text-[1.35rem] font-semibold">{content.name}</span>
            <span className="mt-1 block text-[0.95rem] text-brand-cream/70">{content.role}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
