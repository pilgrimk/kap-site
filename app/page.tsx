import type { Metadata } from "next";
import { bricolage } from "@/lib/fonts";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HoursSection } from "@/components/sections/home/HoursSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { VideoSection } from "@/components/sections/home/VideoSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { MidPageCTA } from "@/components/sections/home/MidPageCTA";
import { CredibilitySection } from "@/components/sections/home/CredibilitySection";
import { RecommendationsSection } from "@/components/sections/home/RecommendationsSection";
import { HomeFinalCTA } from "@/components/sections/home/HomeFinalCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className={bricolage.variable}>
      <HomeHero />
      <HoursSection />
      <ServicesSection />
      <VideoSection />
      <ProcessSection />
      <MidPageCTA />
      <CredibilitySection />
      <RecommendationsSection />
      <HomeFinalCTA />
    </div>
  );
}
