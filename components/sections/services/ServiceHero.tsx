import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRIMARY_CTA } from "@/lib/constants";
import type { ServiceIcon } from "@/lib/content";
import { cn } from "@/lib/utils";
import o from "@/components/shared/optimism.module.css";
import { serviceIcons } from "./icons";
import s from "./services.module.css";

type HeroContent = {
  eyebrow: string;
  headlineLead: string;
  headlineEmphasis: string;
  subhead: string;
  secondaryCta: { label: string; href: string };
  board: {
    label: string;
    manual: string;
    automated: string;
    tasks: { icon: ServiceIcon; text: string }[];
    caption: string;
  };
  outcomesLabel: string;
  outcomes: string[];
};

/**
 * Service hero: the outcome headline and CTA beside a board of everyday tasks that flip from
 * "by hand" to "automated" on load, then the outcomes strip on the hero's baseline.
 */
export function ServiceHero({ content }: { content: HeroContent }) {
  const { eyebrow, headlineLead, headlineEmphasis, subhead, secondaryCta, board, outcomesLabel, outcomes } =
    content;

  return (
    <section aria-labelledby="service-title" className="relative overflow-hidden border-b border-rule">
      <div aria-hidden className={o.atmosphere} />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-x-14 gap-y-10 px-6 pt-8 pb-12 md:px-8 md:pt-14 md:pb-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] *:min-w-0">
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-coral-ink md:text-xs">
            {eyebrow}
          </p>
          <h1
            id="service-title"
            className="mt-4 font-display text-[clamp(2.75rem,1.4rem+3.6vw,4.9rem)] font-bold leading-[1.02] tracking-tight md:mt-5"
          >
            {headlineLead} <span className="block text-brand-magenta">{headlineEmphasis}</span>
          </h1>
          <p className="mt-6 max-w-[42ch] text-[1.05rem] leading-[1.6] text-ink-soft md:text-[1.15rem]">
            {subhead}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 md:mt-9">
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

        <figure
          aria-labelledby="board-caption"
          className={cn("relative m-0 overflow-hidden rounded-[20px] border border-rule bg-paper p-5 md:p-6", o.accentEdge)}
        >
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">{board.label}</p>
          {/* Narrow screens: icon and task on one line, the status beneath the task. sm+: one row. */}
          <ul className="mt-4 grid grid-cols-1 gap-2.5">
            {board.tasks.map((task, i) => {
              const Icon = serviceIcons[task.icon];
              return (
                <li
                  key={task.text}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 rounded-[14px] border border-[#e6dcbc] bg-background px-3 py-3 sm:flex"
                  style={{ "--d": `${700 + i * 420}ms` } as React.CSSProperties}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-deep-cream text-coral-ink">
                    <Icon aria-hidden className="size-4.5" />
                  </span>
                  <span className="min-w-0 text-[0.95rem] leading-snug sm:flex-1">{task.text}</span>
                  <span className={cn(s.status, "col-start-2 sm:ml-auto")}>
                    <span aria-hidden className={cn(s.manual, "rounded-full border border-rule px-2.5 py-1 text-xs font-medium whitespace-nowrap text-ink-soft")}>
                      {board.manual}
                    </span>
                    <span className={cn(s.automated, "inline-flex items-center gap-1 rounded-full bg-brand-amber px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-brand-charcoal")}>
                      <Check aria-hidden className="size-3.5" />
                      {board.automated}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
          <figcaption id="board-caption" className="mt-4 text-[0.8125rem] text-ink-soft">
            {board.caption}
          </figcaption>
        </figure>

        <div className="border-t border-rule pt-7 lg:col-span-2">
          <h2 className="text-sm font-semibold text-brand-magenta">{outcomesLabel}</h2>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((outcome) => (
              <li key={outcome} className="flex items-center gap-3 font-medium">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-amber text-brand-charcoal">
                  <Check aria-hidden className="size-3.5" />
                </span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
