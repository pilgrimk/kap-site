import { Check, Clock, FileSpreadsheet, Keyboard, Repeat } from "lucide-react";
import { HOME_HOURS } from "@/lib/content";
import { HomeHeading } from "./HomeHeading";

const todayIcons = [Keyboard, Clock, FileSpreadsheet, Repeat];

/**
 * Each row is a small piece of the hero's workflow: the manual task today, a connector, and the
 * same task automated, so the diagram's language carries on below the hero.
 */
export function HoursSection() {
  return (
    <section aria-labelledby="hours-title">
      <div className="mx-auto max-w-6xl px-6 py-18 md:px-8 md:py-24">
        <HomeHeading id="hours-title">{HOME_HOURS.title}</HomeHeading>
        <ul className="mt-10 grid gap-5 md:gap-4">
          {HOME_HOURS.rows.map((row, i) => {
            const Icon = todayIcons[i];
            return (
              <li
                key={row.today}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] md:items-stretch"
              >
                <div className="flex items-start gap-3.5 rounded-[14px] border border-rule bg-deep-cream/70 p-4 md:p-5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-rule bg-paper text-ink-soft">
                    <Icon aria-hidden className="size-4.5" />
                  </div>
                  <div>
                    <p className="font-mono text-[0.65625rem] uppercase tracking-[0.12em] text-ink-soft">
                      {HOME_HOURS.todayLabel}
                    </p>
                    <p className="mt-1 leading-snug text-ink-soft">{row.today}</p>
                  </div>
                </div>

                {/* Connector: vertical under the card on phones, horizontal between cards wider */}
                <div aria-hidden className="relative h-4 md:h-auto">
                  <span className="absolute top-0 bottom-0 left-[2.125rem] w-0.5 bg-coral-ink md:top-1/2 md:right-1 md:bottom-auto md:left-1 md:h-0.5 md:w-auto md:-translate-y-1/2" />
                </div>

                <div className="flex items-start gap-3.5 rounded-[14px] border border-[#e6dcbc] bg-paper p-4 md:p-5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-brand-amber text-brand-charcoal">
                    <Check aria-hidden className="size-4.5" />
                  </div>
                  <div>
                    <p className="font-mono text-[0.65625rem] uppercase tracking-[0.12em] text-coral-ink">
                      {HOME_HOURS.automatedLabel}
                    </p>
                    <p className="mt-1 font-semibold leading-snug">{row.automated}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
