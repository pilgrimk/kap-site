import { BellRing, Check, Sparkles } from "lucide-react";
import { WorkflowMotion } from "@/components/shared/WorkflowMotion";
import { cn } from "@/lib/utils";
import o from "@/components/shared/optimism.module.css";
import { ReplayButton } from "./ReplayButton";
import { ServiceHeroCopy, type ServiceHeroCopyContent } from "./ServiceHeroCopy";
import c from "./conversation.module.css";

type HeroContent = ServiceHeroCopyContent & {
  chat: {
    channel: string;
    assistant: string;
    customerLabel: string;
    replay: string;
    replayLabel: string;
    messages: { from: "customer" | "assistant"; text: string }[];
    captured: { label: string; fields: string[] };
    handoff: { label: string; title: string; details: string[] };
    caption: string;
  };
};

// When each message appears (ms). An assistant reply is preceded by 800ms of typing dots; the
// details are captured after the customer's answer, and the team is notified last.
const messageAt = [400, 1700, 2900, 4700];
const typingFor = 800;
const capturedAt = 3600;
const handoffAt = 5500;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * Customer Engagement hero: the outcome headline beside an example website-chat conversation that
 * plays once (question, AI reply, details captured) and ends with the handoff card breaking out of
 * the chat panel, to show a person taking over.
 */
export function ConversationHero({ content }: { content: HeroContent }) {
  const { chat } = content;

  return (
    <section aria-labelledby="service-title" className="relative overflow-hidden border-b border-rule">
      <div aria-hidden className={o.atmosphere} />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-x-12 gap-y-10 px-6 pt-8 pb-14 md:px-8 md:pt-14 md:pb-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] *:min-w-0">
        <ServiceHeroCopy content={content} />

        <WorkflowMotion className={cn(c.conversation, "m-0")} labelledBy="chat-caption" layoutQuery={null}>
          <div className={cn("relative overflow-hidden rounded-[20px] border border-rule bg-paper", o.accentEdge)}>
            <div className="flex items-center gap-3 border-b border-rule px-4 py-3.5 md:px-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-brand-magenta text-brand-cream">
                <Sparkles aria-hidden className="size-4.5" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.95rem] leading-tight font-semibold">{chat.channel}</p>
                <p className="text-[0.8125rem] text-ink-soft">{chat.assistant}</p>
              </div>
              <ReplayButton label={chat.replayLabel}>{chat.replay}</ReplayButton>
            </div>

            <ol className="grid gap-3 px-4 pt-5 pb-14 md:px-5">
              {chat.messages.map((message, i) => {
                const customer = message.from === "customer";
                const bubble = (
                  <p
                    className={cn(
                      c.msg,
                      customer
                        ? cn(c.customer, "rounded-br-[6px] bg-deep-cream")
                        : cn(c.assistant, "rounded-bl-[6px] border border-[#e6dcbc] bg-background"),
                      "max-w-[88%] rounded-[16px] px-3.5 py-2.5 text-[0.95rem] leading-snug",
                    )}
                    style={delay(messageAt[i])}
                  >
                    <span className="sr-only">{customer ? chat.customerLabel : chat.assistant}: </span>
                    {message.text}
                  </p>
                );

                return [
                  <li key={message.text} className={customer ? "grid justify-items-end" : c.stack}>
                    {customer ? null : (
                      <span
                        aria-hidden
                        className={cn(c.typing, "inline-flex gap-1 rounded-[16px] rounded-bl-[6px] border border-[#e6dcbc] bg-background px-3.5 py-3.5")}
                        style={delay(messageAt[i] - typingFor)}
                      >
                        {[0, 1, 2].map((dot) => (
                          <span
                            key={dot}
                            className="size-1.5 rounded-full bg-ink-soft"
                            style={{ "--i": dot } as React.CSSProperties}
                          />
                        ))}
                      </span>
                    )}
                    {bubble}
                  </li>,
                  // The captured details follow the customer's answer
                  i === 2 ? (
                    <li key="captured" className={cn(c.msg, "flex flex-wrap items-center gap-x-2.5 gap-y-2 py-1")} style={delay(capturedAt)}>
                      <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold">
                        <span className="flex size-5 items-center justify-center rounded-md bg-brand-amber text-brand-charcoal">
                          <Check aria-hidden className="size-3" />
                        </span>
                        {chat.captured.label}:
                      </span>
                      {chat.captured.fields.map((field) => (
                        <span key={field} className="rounded-full border border-rule bg-paper px-2.5 py-0.5 text-[0.8125rem]">
                          {field}
                        </span>
                      ))}
                    </li>
                  ) : null,
                ];
              })}
            </ol>
          </div>

          {/* Breaks out of the chat panel: the conversation passing to a person */}
          <div
            className={cn(
              c.handoff,
              "relative z-10 mx-3 -mt-9 flex gap-3.5 rounded-[16px] bg-brand-charcoal p-4 text-brand-cream shadow-[0_18px_40px_-22px_rgba(26,26,26,0.6)] md:mx-5 md:p-5 lg:mr-10 lg:-ml-10",
            )}
            style={delay(handoffAt)}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-amber text-brand-charcoal">
              <BellRing aria-hidden className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-brand-amber">{chat.handoff.label}</p>
              <p className="mt-1.5 font-display text-[1.25rem] leading-tight font-bold tracking-[-0.01em]">{chat.handoff.title}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {chat.handoff.details.map((detail) => (
                  <li key={detail} className="rounded-full border border-brand-cream/20 px-2.5 py-0.5 text-[0.8125rem] text-brand-cream/90">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <figcaption id="chat-caption" className="mt-4 text-[0.8125rem] text-ink-soft">
            {chat.caption}
          </figcaption>
        </WorkflowMotion>
      </div>
    </section>
  );
}
