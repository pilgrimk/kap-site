import Link from "next/link";
import { ArrowDown, ArrowRight, Send } from "lucide-react";
import { HomeHeading } from "@/components/sections/home/HomeHeading";
import type { ServiceIcon } from "@/lib/content";
import { serviceIcons } from "./icons";

type ConnectContent = {
  title: string;
  intro: string;
  form: { label: string; fields: string[]; button: string };
  afterLabel: string;
  items: { icon: ServiceIcon; title: string; body: string }[];
  note: string;
  links: { label: string; href: string }[];
};

/**
 * A website's contact form fanning out to what can happen after "Send": the point where a KAP
 * website meets KAP's automation work. Static; the examples are possibilities, not a package.
 */
export function ConnectedSite({ content }: { content: ConnectContent }) {
  return (
    <section aria-labelledby="connect-title" className="bg-deep-cream">
      <div className="mx-auto max-w-6xl px-6 py-18 md:px-8 md:py-24">
        <HomeHeading id="connect-title" className="max-w-[20ch]">
          {content.title}
        </HomeHeading>
        <p className="mt-5 max-w-[54ch] text-[1.05rem] leading-relaxed text-ink-soft md:text-lg">{content.intro}</p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-center *:min-w-0">
          {/* An illustration of a contact form, not a working one */}
          <div className={`relative lg:pr-12 lg:after:absolute lg:after:top-1/2 lg:after:right-0 lg:after:h-0.5 lg:after:w-12 lg:after:bg-coral-ink/50`}>
            <div aria-hidden className="rounded-[20px] border border-[#e6dcbc] bg-paper p-6 shadow-[0_24px_48px_-32px_rgba(26,26,26,0.35)]">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">{content.form.label}</p>
              <div className="mt-5 grid gap-3.5">
                {content.form.fields.map((field, i) => (
                  <div key={field}>
                    <p className="text-[0.8125rem] font-medium">{field}</p>
                    <div className={`mt-1.5 rounded-lg border border-[#e6dcbc] bg-background ${i === content.form.fields.length - 1 ? "h-16" : "h-9"}`} />
                  </div>
                ))}
              </div>
              <p className="mt-5 inline-flex items-center gap-2 rounded-[10px] bg-brand-coral px-5 py-2.5 font-semibold text-brand-charcoal">
                {content.form.button}
                <Send className="size-4" />
              </p>
            </div>
          </div>

          <ArrowDown aria-hidden className="mx-auto my-4 size-5 text-coral-ink lg:hidden" />

          <div className="relative lg:pl-12">
            <p id="connect-after" className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft lg:sr-only">
              {content.afterLabel}
            </p>
            {/* The spine the outcomes branch from */}
            <span aria-hidden className={`absolute top-9 bottom-9 left-0 hidden w-0.5 lg:block bg-coral-ink/50`} />
            <ul aria-labelledby="connect-after" className="grid gap-3">
              {content.items.map((item) => {
                const Icon = serviceIcons[item.icon];
                return (
                  <li
                    key={item.title}
                    className={`relative flex items-center gap-4 rounded-[14px] border border-[#e6dcbc] bg-paper px-4 py-3.5 lg:before:absolute lg:before:top-1/2 lg:before:-left-12 lg:before:h-0.5 lg:before:w-12 lg:before:bg-coral-ink/50`}
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-amber text-brand-charcoal">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-snug">{item.title}</h3>
                      <p className="mt-0.5 text-[0.9rem] leading-snug text-ink-soft">{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-x-10 gap-y-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-[58ch] text-[0.95rem] leading-relaxed text-ink-soft">{content.note}</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {content.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-sm border-b border-foreground/40 pb-0.5 text-[0.9375rem] font-semibold transition-colors duration-150 hover:border-coral-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                >
                  {link.label}
                  <ArrowRight aria-hidden className="size-3.5 text-coral-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
