import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { AboutNarrative } from "@/components/sections/AboutNarrative";
import { AboutPrinciples } from "@/components/sections/AboutPrinciples";
import { AboutFoundation } from "@/components/sections/AboutFoundation";
import { WhyKap } from "@/components/sections/WhyKap";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ABOUT_HERO } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT_HERO.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={ABOUT_HERO.eyebrow}
        title={ABOUT_HERO.title}
        description={ABOUT_HERO.description}
      />
      <AboutNarrative />
      <AboutPrinciples />
      <AboutFoundation />
      <WhyKap />
      <FinalCTA />
    </>
  );
}
