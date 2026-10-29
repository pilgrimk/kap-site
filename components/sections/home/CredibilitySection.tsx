import { Activity, FileText, RefreshCw, RotateCcw } from "lucide-react";
import { HOME_CREDIBILITY } from "@/lib/content";
import { cn } from "@/lib/utils";
import { HomeHeading } from "./HomeHeading";
import h from "./home.module.css";

const traitIcons = [Activity, RotateCcw, FileText, RefreshCw];

/** Kevin's career facts (never presented as company results) and how KAP builds. */
export function CredibilitySection() {
  const { title, lead, careerLabel, career, standardLead, traits } = HOME_CREDIBILITY;

  return (
    <section aria-labelledby="credibility-title">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-x-18">
        <div>
          <HomeHeading id="credibility-title">{title}</HomeHeading>
          <p className="mt-5 max-w-[40ch] text-[1.05rem] leading-[1.55] text-ink-soft md:text-[1.15rem]">
            {lead}
          </p>
          <p className="mt-10 text-sm font-semibold text-brand-magenta">{careerLabel}</p>
          <dl className="mt-4 grid gap-5">
            {career.map((item) => (
              <div key={item.field} className="grid gap-1 md:grid-cols-[9.5rem_minmax(0,1fr)] md:items-baseline md:gap-4">
                <dt className="font-display text-[1.3rem] font-semibold tracking-[-0.01em]">{item.field}</dt>
                <dd className="leading-normal text-ink-soft">{item.fact}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={cn("relative overflow-hidden rounded-[20px] bg-[#232323] p-6 text-brand-cream md:p-8", h.accentEdge)}>
          <p className="max-w-[32ch] text-[1.05rem] leading-normal text-brand-cream/75">{standardLead}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {traits.map((trait, i) => {
              const Icon = traitIcons[i];
              return (
                <li
                  key={trait}
                  className="flex items-center gap-3.5 rounded-[14px] border border-brand-cream/15 bg-[#2c2c2c] px-4 py-3.5 sm:flex-col sm:items-start sm:p-[1.125rem]"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-brand-amber/15 text-brand-amber">
                    <Icon aria-hidden className="size-4.5" />
                  </div>
                  <span className="font-semibold">{trait}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
