import { HomeHeading } from "@/components/sections/home/HomeHeading";
import type { ServiceIcon } from "@/lib/content";
import { serviceIcons } from "./icons";

type ApproachContent = {
  title: string;
  intro: string;
  steps: { icon: ServiceIcon; title: string; body: string }[];
};

/** The working process as a vertical timeline beside its heading. */
export function ApproachSteps({ content }: { content: ApproachContent }) {
  return (
    <section aria-labelledby="approach-title">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-10 px-6 py-18 md:px-8 md:py-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] *:min-w-0">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <HomeHeading id="approach-title">{content.title}</HomeHeading>
          <p className="mt-5 max-w-[40ch] text-[1.05rem] leading-relaxed text-ink-soft md:text-lg">
            {content.intro}
          </p>
        </div>
        <div className="relative">
          {/* The line that joins the steps */}
          <span aria-hidden className="absolute top-6 bottom-6 left-[calc(1.5rem-1px)] w-0.5 bg-coral-ink/50" />
          <ol className="relative grid gap-8">
          {content.steps.map((step) => {
            const Icon = serviceIcons[step.icon];
            return (
              <li key={step.title} className="relative flex gap-5">
                <span className="relative flex size-12 shrink-0 items-center justify-center rounded-[14px] border border-[#e6dcbc] bg-paper text-coral-ink">
                  <Icon aria-hidden className="size-5" />
                </span>
                <div className="pt-2.5">
                  <h3 className="font-display text-[1.3rem] font-semibold tracking-[-0.01em]">{step.title}</h3>
                  <p className="mt-2 max-w-[48ch] leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
