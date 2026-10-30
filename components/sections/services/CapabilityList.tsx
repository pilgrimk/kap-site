import { HomeHeading } from "@/components/sections/home/HomeHeading";
import type { ServiceIcon } from "@/lib/content";
import { serviceIcons } from "./icons";

type CapabilityContent = {
  title: string;
  intro: string;
  items: { icon: ServiceIcon; title: string; body: string }[];
};

/** Examples of what can be built, as a ruled list rather than a wall of cards. */
export function CapabilityList({ content }: { content: CapabilityContent }) {
  return (
    <section aria-labelledby="capabilities-title">
      <div className="mx-auto max-w-6xl px-6 pb-18 md:px-8 md:pb-24">
        <HomeHeading id="capabilities-title">{content.title}</HomeHeading>
        <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-relaxed text-ink-soft md:text-lg">
          {content.intro}
        </p>
        <ul className="mt-10 grid grid-cols-1 border-t border-rule md:grid-cols-2 md:gap-x-10 lg:grid-cols-3">
          {content.items.map((item) => {
            const Icon = serviceIcons[item.icon];
            return (
              <li key={item.title} className="flex gap-4 border-b border-rule py-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-deep-cream text-coral-ink">
                  <Icon aria-hidden className="size-5" />
                </span>
                <div>
                  <h3 className="text-[1.05rem] font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
