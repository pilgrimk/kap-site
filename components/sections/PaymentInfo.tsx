import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";
import { PAYMENT_PAGE } from "@/lib/content";

const { next, stripe, help } = PAYMENT_PAGE;

/**
 * Beside the payment form: what happens next, Stripe's role, and where to ask about an invoice.
 * Every statement describes the existing integration (see PAYMENT_PAGE in lib/content.ts).
 */
export function PaymentInfo() {
  return (
    <aside aria-label="About this payment" className="grid min-w-0 content-start gap-10">
      <section aria-labelledby="payment-next-title">
        <h2 id="payment-next-title" className="font-display text-[1.35rem] font-bold tracking-[-0.01em]">
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

      <section aria-labelledby="payment-stripe-title" className="rounded-[16px] bg-brand-charcoal p-6 text-brand-cream">
        <div className="flex items-center gap-3">
          <span aria-hidden className="flex size-9 items-center justify-center rounded-[10px] bg-brand-amber/15 text-brand-amber">
            <ShieldCheck className="size-4.5" />
          </span>
          <h2 id="payment-stripe-title" className="font-semibold">
            {stripe.title}
          </h2>
        </div>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-brand-cream/75">{stripe.body}</p>
      </section>

      <section aria-labelledby="payment-help-title" className="border-t border-rule pt-8">
        <h2 id="payment-help-title" className="font-semibold">
          {help.title}
        </h2>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{help.body}</p>
        <p className="mt-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-sm font-semibold wrap-anywhere underline decoration-foreground/40 underline-offset-4 transition-colors duration-150 hover:decoration-coral-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <Link
          href={help.contact.href}
          className="mt-4 inline-flex items-center gap-1.5 rounded-sm border-b border-foreground/40 pb-0.5 text-[0.9375rem] font-semibold transition-colors duration-150 hover:border-coral-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          {help.contact.label}
          <ArrowRight aria-hidden className="size-3.5 text-coral-ink" />
        </Link>
      </section>
    </aside>
  );
}
