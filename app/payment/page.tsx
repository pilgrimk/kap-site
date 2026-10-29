import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { PaymentForm } from "@/components/sections/PaymentForm";
import { PaymentInfo } from "@/components/sections/PaymentInfo";
import { PAYMENT_HERO } from "@/lib/content";
import { STRIPE_RETURN_SCRIPT } from "@/lib/stripe-return-script";

export const metadata: Metadata = {
  title: "Make a Payment",
  description: PAYMENT_HERO.description,
  // Customers reach this page from their invoice; it should not be searchable.
  robots: { index: false, follow: false },
};

export default function PaymentPage() {
  return (
    <>
      {/* Must run before hydration and analytics; see lib/stripe-return-script.ts */}
      <script dangerouslySetInnerHTML={{ __html: STRIPE_RETURN_SCRIPT }} />
      <PageHero
        eyebrow={PAYMENT_HERO.eyebrow}
        title={PAYMENT_HERO.title}
        description={PAYMENT_HERO.description}
      />
      <SectionContainer className="pt-0 md:pt-0">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:gap-10">
          <PaymentForm />
          <PaymentInfo />
        </div>
      </SectionContainer>
    </>
  );
}
