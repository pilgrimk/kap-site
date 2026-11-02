import type { Metadata } from "next";
import { bricolage } from "@/lib/fonts";
import { PaymentForm } from "@/components/sections/PaymentForm";
import { PaymentInfo } from "@/components/sections/PaymentInfo";
import { PAYMENT_PAGE } from "@/lib/content";
import { STRIPE_RETURN_SCRIPT } from "@/lib/stripe-return-script";
import { cn } from "@/lib/utils";
import o from "@/components/shared/optimism.module.css";

const { meta, hero } = PAYMENT_PAGE;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  // Customers reach this page from their invoice; it should not be searchable.
  robots: { index: false, follow: false },
};

export default function PaymentPage() {
  return (
    <div className={bricolage.variable}>
      {/* Must run before hydration and analytics; see lib/stripe-return-script.ts */}
      <script dangerouslySetInnerHTML={{ __html: STRIPE_RETURN_SCRIPT }} />

      <section aria-labelledby="payment-title" className="relative overflow-hidden">
        {/* Faded out at the bottom: the form starts right under the hero, so a hard edge would show */}
        <div aria-hidden className={cn(o.atmosphere, "mask-[linear-gradient(to_bottom,black_45%,transparent)]")} />
        {/* A compact hero: the payment is the task, so the form starts high on the page */}
        <div className="relative mx-auto max-w-6xl px-6 pt-8 pb-10 md:px-8 md:pt-14 md:pb-14">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-coral-ink md:text-xs">
            {hero.eyebrow}
          </p>
          <h1
            id="payment-title"
            className="mt-4 font-display text-[clamp(2.4rem,1.5rem+2.8vw,4rem)] font-bold leading-[1.04] tracking-tight"
          >
            {hero.headlineLead} <span className="text-brand-magenta">{hero.headlineEmphasis}</span>
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-[1.6] text-ink-soft md:text-[1.15rem]">
            {hero.body}
          </p>
        </div>
      </section>

      {/* minmax(0, …) tracks: the form's inputs and long email addresses can never widen the
          columns past the viewport (the 320px enlarged-text overflow came from an auto track) */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-6 pb-20 md:px-8 md:pb-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <PaymentForm />
        <PaymentInfo />
      </div>
    </div>
  );
}
