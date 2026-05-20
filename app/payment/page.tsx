import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { PaymentForm } from "@/components/sections/PaymentForm";
import { PaymentInfo } from "@/components/sections/PaymentInfo";
import { PAYMENT_HERO } from "@/lib/content";

export const metadata: Metadata = {
  title: "Make a Payment",
  description: PAYMENT_HERO.description,
};

export default function PaymentPage() {
  return (
    <>
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
