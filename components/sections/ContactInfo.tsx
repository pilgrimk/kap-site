import { Mail } from "lucide-react";
import { CONTACT_EMAIL, MAILING_ADDRESS } from "@/lib/constants";
import { CONTACT_PAGE } from "@/lib/content";

const { next, direct } = CONTACT_PAGE;

/**
 * Beside the contact form: what happens after a message is sent, and the direct email route.
 * Every statement describes the existing flow (see CONTACT_PAGE in lib/content.ts).
 */
export function ContactInfo() {
  return (
    <aside aria-label="About contacting KAP" className="grid min-w-0 content-start gap-10">
      <section aria-labelledby="contact-next-title">
        <h2 id="contact-next-title" className="font-display text-[1.35rem] font-bold tracking-[-0.01em]">
          {next.title}
        </h2>
        <ol className="mt-6 grid gap-6">
          {next.steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-4">
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-rule bg-paper font-mono text-[0.8125rem] font-bold text-coral-ink"
              >
                {i + 1}
              </span>
              {i < next.steps.length - 1 ? (
                <span aria-hidden className="absolute top-11 -bottom-5 left-[1.0625rem] w-px bg-rule" />
              ) : null}
              <div className="min-w-0 pt-1.5">
                <h3 className="font-semibold leading-snug">{step.title}</h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="contact-direct-title" className="rounded-[16px] bg-brand-charcoal p-6 text-brand-cream">
        <div className="flex items-center gap-3">
          <span aria-hidden className="flex size-9 items-center justify-center rounded-[10px] bg-brand-amber/15 text-brand-amber">
            <Mail className="size-4.5" />
          </span>
          <h2 id="contact-direct-title" className="font-semibold">
            {direct.title}
          </h2>
        </div>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-brand-cream/75">{direct.body}</p>
        <p className="mt-1.5">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-sm font-semibold wrap-anywhere text-brand-cream underline decoration-brand-amber/60 underline-offset-4 transition-colors duration-150 hover:decoration-brand-amber focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cream"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <dl className="mt-6 border-t border-brand-cream/15 pt-5 text-[0.95rem]">
          <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-cream/70">
            {direct.mailLabel}
          </dt>
          <dd className="mt-1.5 text-brand-cream/85">{MAILING_ADDRESS}</dd>
        </dl>
      </section>
    </aside>
  );
}
