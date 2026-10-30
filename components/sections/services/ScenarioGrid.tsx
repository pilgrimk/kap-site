import { Check } from "lucide-react";
import { HomeHeading } from "@/components/sections/home/HomeHeading";
import type { ServiceIcon } from "@/lib/content";
import { serviceIcons } from "./icons";

type ScenarioContent = {
  title: string;
  todayLabel: string;
  automatedLabel: string;
  items: { icon: ServiceIcon; today: string; automated: string }[];
};

/** Recognisable situations as before-and-after cards joined by a workflow connector. */
export function ScenarioGrid({ content }: { content: ScenarioContent }) {
  return (
    <section aria-labelledby="scenarios-title">
      <div className="mx-auto max-w-6xl px-6 py-18 md:px-8 md:py-24">
        <HomeHeading id="scenarios-title">{content.title}</HomeHeading>
        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {content.items.map((item) => {
            const Icon = serviceIcons[item.icon];
            return (
              <li key={item.today} className="rounded-[20px] border border-rule bg-deep-cream/70 p-4 md:p-5">
                {/* Inset to match the card below, so the connector runs icon to icon */}
                <div className="flex items-start gap-3.5 px-[calc(1rem+1px)]">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-rule bg-paper text-ink-soft">
                    <Icon aria-hidden className="size-4.5" />
                  </span>
                  <div>
                    <p className="font-mono text-[0.65625rem] uppercase tracking-[0.12em] text-ink-soft">
                      {content.todayLabel}
                    </p>
                    <p className="mt-1 leading-snug text-ink-soft">{item.today}</p>
                  </div>
                </div>
                {/* Connector from the problem to the automated outcome */}
                <div aria-hidden className="ml-[2.125rem] h-4 w-0.5 bg-coral-ink" />
                <div className="flex items-start gap-3.5 rounded-[14px] border border-[#e6dcbc] bg-paper p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-brand-amber text-brand-charcoal">
                    <Check aria-hidden className="size-4.5" />
                  </span>
                  <div>
                    <p className="font-mono text-[0.65625rem] uppercase tracking-[0.12em] text-coral-ink">
                      {content.automatedLabel}
                    </p>
                    <p className="mt-1 font-semibold leading-snug">{item.automated}</p>
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
