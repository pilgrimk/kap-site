import { HomeHeading } from "@/components/sections/home/HomeHeading";
import type { ServiceIcon } from "@/lib/content";
import { cn } from "@/lib/utils";
import { serviceIcons } from "./icons";

type QualityContent = {
  title: string;
  intro: string;
  items: { icon: ServiceIcon; title: string; body: string }[];
  specimen: { label: string; type: string };
  scale: { label: string; sample: string };
};

// The illustrative Fernway palette from the hero, shown as "a brand that isn't ours"
const swatches = ["#1f3d2b", "#4d7a4f", "#e3ebdc", "#fbf9f2", "#c45f37"];

/** A type-and-colour specimen: each site gets its own look. */
function Specimen({ label, type }: QualityContent["specimen"]) {
  return (
    <div className="mt-8 flex flex-1 flex-col justify-end rounded-[14px] bg-[#fbf9f2] p-5 text-[#1f3d2b] ring-1 ring-[#e3ebdc]">
      <p aria-hidden className="font-display text-[clamp(4.5rem,3rem+5vw,7.5rem)] leading-none font-bold tracking-[-0.04em]">
        {type}
      </p>
      <div aria-hidden className="mt-5 flex gap-2">
        {swatches.map((colour) => (
          <span key={colour} className="size-8 rounded-full ring-1 ring-[#1f3d2b]/15" style={{ background: colour }} />
        ))}
      </div>
      <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em]">{label}</p>
    </div>
  );
}

/** Desktop, tablet and phone outlines. */
function Devices() {
  return (
    <div aria-hidden className="mt-7 flex items-end gap-3 text-coral-ink">
      <span className="h-14 w-22 rounded-md border-2 border-current" />
      <span className="h-12 w-9 rounded-md border-2 border-current" />
      <span className="h-9 w-5 rounded-[5px] border-2 border-current" />
    </div>
  );
}

/** The same letters at three text sizes. */
function TextScale({ label, sample }: QualityContent["scale"]) {
  return (
    <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-2">
      <span aria-hidden className="flex items-baseline gap-3 font-display font-bold text-brand-magenta">
        <span className="text-[1.1rem]">{sample}</span>
        <span className="text-[1.6rem]">{sample}</span>
        <span className="text-[2.3rem] leading-none">{sample}</span>
      </span>
      <span className="pb-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">{label}</span>
    </div>
  );
}

/**
 * The qualities as a bento: the design tile is tall, the build tile runs across the bottom, and
 * three tiles show their point rather than only saying it.
 */
export function QualityBento({ content }: { content: QualityContent }) {
  const [design, responsive, messaging, contact, fast, build] = content.items;

  const tile = (item: QualityContent["items"][number], className?: string, extra?: React.ReactNode) => {
    const Icon = serviceIcons[item.icon];
    return (
      <li key={item.title} className={cn("flex flex-col rounded-[20px] border border-[#e6dcbc] bg-paper p-6 md:p-7", className)}>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-deep-cream text-coral-ink">
          <Icon aria-hidden className="size-5" />
        </span>
        <h3 className="mt-5 font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.01em]">{item.title}</h3>
        <p className="mt-2 max-w-[46ch] leading-relaxed text-ink-soft">{item.body}</p>
        {extra}
      </li>
    );
  };

  return (
    <section aria-labelledby="qualities-title">
      <div className="mx-auto max-w-6xl px-6 py-18 md:px-8 md:py-24">
        <HomeHeading id="qualities-title">{content.title}</HomeHeading>
        <p className="mt-5 max-w-[56ch] text-[1.05rem] leading-relaxed text-ink-soft md:text-lg">{content.intro}</p>
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {tile(design, "md:col-span-2 lg:col-span-1 lg:row-span-2", <Specimen {...content.specimen} />)}
          {tile(responsive, undefined, <Devices />)}
          {tile(messaging)}
          {tile(contact)}
          {tile(fast, undefined, <TextScale {...content.scale} />)}
          {tile(build, "md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-[auto_minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-x-6 lg:*:mt-0")}
        </ul>
      </div>
    </section>
  );
}
