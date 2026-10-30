import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRIMARY_CTA } from "@/lib/constants";

export type ServiceHeroCopyContent = {
  eyebrow: string;
  headlineLead: string;
  headlineEmphasis: string;
  subhead: string;
  secondaryCta: { label: string; href: string };
};

/** The text column every service hero shares: eyebrow, two-line headline, subhead and CTAs. */
export function ServiceHeroCopy({ content }: { content: ServiceHeroCopyContent }) {
  const { eyebrow, headlineLead, headlineEmphasis, subhead, secondaryCta } = content;

  return (
    <div>
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-coral-ink md:text-xs">
        {eyebrow}
      </p>
      <h1
        id="service-title"
        className="mt-4 font-display text-[clamp(2.75rem,1.4rem+3.6vw,4.9rem)] font-bold leading-[1.02] tracking-tight md:mt-5"
      >
        {headlineLead} <span className="block text-balance text-brand-magenta">{headlineEmphasis}</span>
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
  );
}
