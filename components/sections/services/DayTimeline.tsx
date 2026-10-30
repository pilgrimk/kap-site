import { HomeHeading } from "@/components/sections/home/HomeHeading";
import type { ServiceIcon } from "@/lib/content";
import { serviceIcons } from "./icons";

type DayContent = {
  title: string;
  intro: string;
  label: string;
  moments: { time: string; icon: ServiceIcon; title: string; body: string }[];
  caption: string;
};

/** Familiar moments across one working day, set as a timetable rather than a grid of cards. */
export function DayTimeline({ content }: { content: DayContent }) {
  return (
    <section aria-labelledby="day-title" className="bg-deep-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-10 px-6 py-18 md:px-8 md:py-24 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] *:min-w-0">
        <div>
          <HomeHeading id="day-title">{content.title}</HomeHeading>
          <p className="mt-5 max-w-[40ch] text-[1.05rem] leading-relaxed text-ink-soft md:text-lg">{content.intro}</p>
        </div>

        <figure className="m-0" aria-labelledby="day-caption">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">{content.label}</p>
          <ol className="mt-3 border-t border-foreground/15">
            {content.moments.map((moment) => {
              const Icon = serviceIcons[moment.icon];
              return (
                <li
                  key={moment.time}
                  className="grid gap-x-8 gap-y-2 border-b border-foreground/15 py-6 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
                >
                  <p className="font-display text-[1.6rem] leading-none font-bold tracking-[-0.02em] tabular-nums sm:pt-0.5">
                    {moment.time}
                  </p>
                  <div>
                    <h3 className="flex items-center gap-2.5 text-[1.1rem] font-semibold leading-snug">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-paper text-coral-ink">
                        <Icon aria-hidden className="size-4" />
                      </span>
                      {moment.title}
                    </h3>
                    <p className="mt-2 max-w-[52ch] leading-relaxed text-ink-soft">{moment.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <figcaption id="day-caption" className="mt-4 text-[0.8125rem] text-ink-soft">
            {content.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
