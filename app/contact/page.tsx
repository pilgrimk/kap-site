import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { CONTACT_HERO } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: CONTACT_HERO.description,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={CONTACT_HERO.eyebrow}
        title={CONTACT_HERO.title}
        description={CONTACT_HERO.description}
      />
      <SectionContainer className="pt-0 md:pt-0">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr] md:gap-10">
          <ContactForm />
          <ContactInfo />
        </div>
      </SectionContainer>
    </>
  );
}
