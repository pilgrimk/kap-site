import { BellRing, Check, CornerDownRight } from "lucide-react";
import { HomeHeading } from "@/components/sections/home/HomeHeading";
import { cn } from "@/lib/utils";
import o from "@/components/shared/optimism.module.css";

type ConversationContent = {
  title: string;
  intro: string;
  label: string;
  time: string;
  channel: string;
  customerLabel: string;
  assistantLabel: string;
  messages: { from: "customer" | "assistant"; text: string; note?: string }[];
  handoff: {
    label: string;
    title: string;
    fields: { name: string; value: string }[];
    footer: string;
  };
  caption: string;
};

/**
 * One example conversation, annotated with what the assistant is doing at each turn, beside the
 * handoff note the team receives, on the page's one charcoal band before the close. Static: the hero
 * already carries this page's motion.
 */
export function AnnotatedConversation({ id, content }: { id: string; content: ConversationContent }) {
  const { handoff } = content;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 bg-brand-charcoal text-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-18 md:px-8 md:py-24">
        <HomeHeading id={`${id}-title`}>{content.title}</HomeHeading>
        <p className="mt-5 max-w-[56ch] text-[1.05rem] leading-relaxed text-brand-cream/75 md:text-lg">{content.intro}</p>

        <figure aria-labelledby={`${id}-caption`} className="m-0 mt-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-8 *:min-w-0">
            <div className="rounded-[20px] bg-paper p-5 text-foreground md:p-7">
              <p className="flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">
                <span>{content.label}</span>
                <span>
                  {content.channel} · {content.time}
                </span>
              </p>
              <ol className="mt-5 grid gap-3">
                {content.messages.map((message) => {
                  const customer = message.from === "customer";
                  return (
                    <li key={message.text} className={cn("max-w-[88%]", customer ? "justify-self-end" : "justify-self-start")}>
                      <p
                        className={cn(
                          "rounded-[16px] px-3.5 py-2.5 text-[0.95rem] leading-snug [overflow-wrap:anywhere]",
                          customer ? "rounded-br-[6px] bg-deep-cream" : "rounded-bl-[6px] border border-[#e6dcbc] bg-background",
                        )}
                      >
                        <span className="sr-only">{customer ? content.customerLabel : content.assistantLabel}: </span>
                        {message.text}
                      </p>
                      {message.note ? (
                        <p className="mt-1.5 flex items-start gap-1.5 pl-1 text-[0.8125rem] font-semibold text-brand-magenta">
                          <CornerDownRight aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                          {message.note}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className={cn("relative overflow-hidden rounded-[20px] bg-brand-cream p-6 text-foreground md:p-8 lg:sticky lg:top-28", o.accentEdge)}>
              <p className="flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-coral-ink">
                <span className="flex size-8 items-center justify-center rounded-[9px] bg-brand-amber text-brand-charcoal">
                  <BellRing aria-hidden className="size-4" />
                </span>
                {handoff.label}
              </p>
              <h3 className="mt-5 font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.4rem)] leading-[1.05] font-bold tracking-[-0.02em]">
                {handoff.title}
              </h3>
              <dl className="mt-6 divide-y divide-rule border-y border-rule">
                {handoff.fields.map((field) => (
                  <div key={field.name} className="grid gap-x-4 gap-y-0.5 py-3.5 sm:grid-cols-[9rem_minmax(0,1fr)]">
                    <dt className="text-[0.875rem] text-ink-soft">{field.name}</dt>
                    <dd className="m-0 text-[1.05rem] font-semibold [overflow-wrap:anywhere]">{field.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 flex items-center gap-2.5 font-medium">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-amber text-brand-charcoal">
                  <Check aria-hidden className="size-3.5" />
                </span>
                {handoff.footer}
              </p>
            </div>
          </div>
          <figcaption id={`${id}-caption`} className="mt-5 text-[0.8125rem] text-brand-cream/75">
            {content.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
