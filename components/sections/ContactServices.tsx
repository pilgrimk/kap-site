import Link from "next/link";
import { ArrowRight, Blocks, Globe, Megaphone, MessagesSquare, Workflow } from "lucide-react";
import { CONTACT_PAGE, type Service } from "@/lib/content";

const ICONS: Record<Service["icon"], typeof Workflow> = {
  Workflow,
  MessagesSquare,
  Megaphone,
  Blocks,
  Globe,
};

const { help } = CONTACT_PAGE;

/** Below the form: the areas a conversation usually starts from, linking to their service pages. */
export function ContactServices() {
  return (
    <section aria-labelledby="contact-help-title" className="border-t border-rule bg-deep-cream/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
        <div className="min-w-0">
          <h2
            id="contact-help-title"
            className="font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.02em]"
          >
            {help.title}
          </h2>
          <p className="mt-4 max-w-[44ch] leading-relaxed text-ink-soft">{help.intro}</p>
        </div>

        <ul className="grid min-w-0 gap-px overflow-hidden rounded-[16px] border border-rule bg-rule sm:grid-cols-2">
          {help.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.title} className="flex min-w-0 flex-col bg-paper p-6 md:p-7">
                <span
                  aria-hidden
                  className="flex size-10 items-center justify-center rounded-[10px] bg-brand-magenta/8 text-brand-magenta"
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-semibold leading-snug">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{item.description}</p>
                {item.link ? (
                  <Link
                    href={item.link.href}
                    className="mt-5 inline-flex items-center gap-1.5 self-start rounded-sm border-b border-foreground/40 pb-0.5 text-[0.9375rem] font-semibold transition-colors duration-150 hover:border-coral-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                  >
                    {item.link.label}
                    <ArrowRight aria-hidden className="size-3.5 text-coral-ink" />
                  </Link>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
