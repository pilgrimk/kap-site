import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HOME_HERO } from "@/lib/content";
import { PRIMARY_CTA } from "@/lib/constants";
import { WorkflowDiagram } from "./WorkflowDiagram";
import h from "./home.module.css";

/**
 * Headline across the top; the copy and the workflow panel share one top edge below it. On
 * desktop the panel bleeds off the right edge and stands on the hero's baseline rule.
 */
export function HomeHero() {
  const { eyebrow, headlineLead, headlineEmphasis, subhead, secondaryCta } = HOME_HERO;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-rule">
      <div aria-hidden className={h.atmosphere} />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start px-6 pt-6 md:px-8 md:pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-14 lg:gap-y-12">
        <div className="mb-5 md:mb-8 lg:col-span-2 lg:mb-0">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-coral-ink md:text-xs">
            {eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-4 font-display md:mt-5 text-[clamp(2.5rem,1.1rem+3.4vw,4.6rem)] font-bold leading-[1.02] tracking-tight"
          >
            {headlineLead} <span className="block text-brand-magenta">{headlineEmphasis}</span>
          </h1>
        </div>

        {/* lg:pt aligns the description with the panel's label row */}
        <div className="pb-6 md:pb-10 lg:pt-5.5 lg:pb-14">
          <p className="max-w-[34ch] text-[1.05rem] leading-[1.55] text-ink-soft md:text-[1.15rem]">
            {subhead}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3 md:mt-9">
            <Button
              asChild
              variant="coral"
              className="h-auto min-h-13.5 w-full rounded-[10px] px-6.5 py-3 text-center text-base whitespace-normal md:w-auto"
            >
              <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
            </Button>
            <Link
              href={secondaryCta.href}
              className="rounded-sm border-b border-foreground/40 pb-0.5 text-[0.9375rem] font-semibold transition-colors duration-150 hover:border-coral-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>

        <WorkflowDiagram />
      </div>
    </section>
  );
}
