import { ArrowDown, ArrowRight, Check, Sparkles, UserRound } from "lucide-react";
import { HomeHeading } from "@/components/sections/home/HomeHeading";

type BoundaryContent = {
  title: string;
  intro: string;
  assistant: { label: string; items: string[] };
  team: { label: string; items: string[] };
  handover: string;
  rule: string;
};

const sides = [
  { key: "assistant", Icon: Sparkles, tile: "bg-brand-coral text-brand-charcoal" },
  { key: "team", Icon: UserRound, tile: "bg-brand-magenta text-brand-cream" },
] as const;

/** What the assistant handles beside what stays with people, joined by the handover. */
export function BoundarySplit({ content }: { content: BoundaryContent }) {
  const [assistant, team] = sides.map(({ key, Icon, tile }) => {
    const side = content[key];
    return (
      <div key={key} className="rounded-[20px] border border-[#e6dcbc] bg-paper p-6 md:p-7">
        <h3 className="flex items-center gap-3 font-display text-[1.3rem] font-semibold tracking-[-0.01em]">
          <span className={`flex size-10 shrink-0 items-center justify-center rounded-[10px] ${tile}`}>
            <Icon aria-hidden className="size-5" />
          </span>
          {side.label}
        </h3>
        <ul className="mt-5 grid gap-3">
          {side.items.map((item) => (
            <li key={item} className="flex items-start gap-3 leading-relaxed">
              <Check aria-hidden className="mt-1 size-4 shrink-0 text-coral-ink" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  });

  return (
    <section aria-labelledby="boundaries-title" className="bg-deep-cream">
      <div className="mx-auto max-w-6xl px-6 py-18 md:px-8 md:py-24">
        <HomeHeading id="boundaries-title">{content.title}</HomeHeading>
        <p className="mt-5 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink-soft md:text-lg">{content.intro}</p>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-6 *:min-w-0">
          {assistant}
          <p className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-charcoal px-4 py-2 text-[0.875rem] font-semibold text-brand-cream">
              {content.handover}
              <ArrowDown aria-hidden className="size-4 text-brand-amber lg:hidden" />
              <ArrowRight aria-hidden className="hidden size-4 text-brand-amber lg:block" />
            </span>
          </p>
          {team}
        </div>

        <p className="mt-8 flex max-w-[62ch] items-start gap-3 font-medium">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-amber text-brand-charcoal">
            <Check aria-hidden className="size-3.5" />
          </span>
          {content.rule}
        </p>
      </div>
    </section>
  );
}
