import { bricolage } from "@/lib/fonts";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HoursSection } from "@/components/sections/home/HoursSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { VideoSection } from "@/components/sections/home/VideoSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { CredibilitySection } from "@/components/sections/home/CredibilitySection";
import { RecommendationsSection } from "@/components/sections/home/RecommendationsSection";
import { HomeFinalCTA } from "@/components/sections/home/HomeFinalCTA";

export default function HomePage() {
  return (
    <div className={bricolage.variable}>
      <HomeHero />
      <HoursSection />
      <ServicesSection />
      <VideoSection />
      <ProcessSection />
      <CredibilitySection />
      <RecommendationsSection />
      <HomeFinalCTA />
    </div>
  );
}
