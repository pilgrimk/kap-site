import { HomeHeading } from "@/components/sections/home/HomeHeading";
import { WorkflowMotion } from "@/components/shared/WorkflowMotion";
import type { ServiceIcon } from "@/lib/content";
import { cn } from "@/lib/utils";
import { serviceIcons } from "./icons";
import s from "./services.module.css";

type ExampleContent = {
  title: string;
  intro: string;
  label: string;
  steps: { icon: ServiceIcon; title: string; body: string }[];
  caption: string;
};

const stages = [s.s1, s.s2, s.s3, s.s4, s.s5];
// Trigger, AI step, then results: the homepage diagram's colour code
const tileColours = [
  "bg-brand-magenta text-brand-cream",
  "bg-brand-coral text-brand-charcoal",
  "bg-brand-amber text-brand-charcoal",
  "bg-brand-amber text-brand-charcoal",
  "bg-brand-amber text-brand-charcoal",
];

/** One inquiry followed through five steps; the signal loops on the homepage's 7s cycle. */
export function LinearWorkflow({ id, content }: { id: string; content: ExampleContent }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 bg-deep-cream">
      <div className="mx-auto max-w-6xl px-6 py-18 md:px-8 md:py-24">
        <HomeHeading id={`${id}-title`}>{content.title}</HomeHeading>
        <p className="mt-5 max-w-[56ch] text-[1.05rem] leading-relaxed text-ink-soft md:text-lg">
          {content.intro}
        </p>

        <WorkflowMotion
          className={cn(s.flow, "mt-10")}
          labelledBy={`${id}-caption`}
          layoutQuery="(width >= 64rem)"
        >
          <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">
            {content.label}
          </p>
          <ol className={s.steps}>
            {content.steps.map((step, i) => {
              const Icon = serviceIcons[step.icon];
              return (
                <li key={step.title} className={cn(s.step, stages[i])}>
                  <span className={cn("flex size-[40px] shrink-0 items-center justify-center rounded-[10px]", tileColours[i])}>
                    <Icon aria-hidden className="size-[18px]" />
                  </span>
                  <div>
                    <h3 className="text-[1.02rem] font-semibold leading-snug">{step.title}</h3>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-soft">{step.body}</p>
                  </div>
                  <span aria-hidden className={s.conn} />
                </li>
              );
            })}
          </ol>
          <figcaption id={`${id}-caption`} className="mt-5 text-[0.8125rem] text-ink-soft">
            {content.caption}
          </figcaption>
        </WorkflowMotion>
      </div>
    </section>
  );
}
