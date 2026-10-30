import type { ABOUT_PAGE } from "@/lib/content";
import { cn } from "@/lib/utils";
import { HomeHeading } from "../home/HomeHeading";

type ApproachContent = (typeof ABOUT_PAGE)["approach"];

/** Five working habits on one rail: horizontal on wide screens, vertical below. */
export function AboutApproach({ content }: { content: ApproachContent }) {
  const last = content.steps.length - 1;

  return (
    <section aria-labelledby="approach-title" className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <HomeHeading id="approach-title">{content.title}</HomeHeading>
        <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-[1.6] text-ink-soft md:text-[1.15rem]">
          {content.intro}
        </p>

        <ol className="mt-14 grid grid-cols-1 gap-9 lg:grid-cols-5 lg:gap-7">
          {content.steps.map((step, i) => (
            <li key={step.title} className="relative min-w-0 pl-15 lg:pt-16 lg:pl-0">
              <span
                aria-hidden
                className={cn(
                  "absolute top-0 left-0 flex size-11 items-center justify-center rounded-full font-mono text-sm font-bold",
                  i === last ? "bg-brand-magenta text-brand-cream" : "border border-rule bg-paper text-coral-ink",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < last ? (
                <span
                  aria-hidden
                  className="absolute top-13 -bottom-7 left-5.5 w-px bg-rule lg:top-5.5 lg:right-[-1.75rem] lg:bottom-auto lg:left-13 lg:h-px lg:w-auto"
                />
              ) : null}
              <h3 className="font-semibold leading-snug text-balance lg:text-[1.05rem]">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft lg:text-[0.95rem]">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
