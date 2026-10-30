import type { Metadata } from "next";
import { bricolage } from "@/lib/fonts";
import { SERVICE_ENGAGEMENT } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ConversationHero } from "@/components/sections/services/ConversationHero";
import { DayTimeline } from "@/components/sections/services/DayTimeline";
import { CapabilityList } from "@/components/sections/services/CapabilityList";
import { AnnotatedConversation } from "@/components/sections/services/AnnotatedConversation";
import { BoundarySplit } from "@/components/sections/services/BoundarySplit";
import { ApproachSteps } from "@/components/sections/services/ApproachSteps";
import { ToolsAndProof } from "@/components/sections/services/ToolsAndProof";
import { ClosingCTA } from "@/components/shared/ClosingCTA";

const { path, meta } = SERVICE_ENGAGEMENT;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${meta.title} — ${SITE_NAME}`,
    description: meta.description,
    url: path,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${meta.title} — ${SITE_NAME}`,
    description: meta.description,
  },
};

// Only facts the site already states: the service, its description and the provider.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: meta.title,
  serviceType: "Customer engagement automation",
  description: meta.description,
  url: `${SITE_URL}${path}`,
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

export default function CustomerEngagementPage() {
  return (
    <div className={bricolage.variable}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ConversationHero content={SERVICE_ENGAGEMENT.hero} />
      <DayTimeline content={SERVICE_ENGAGEMENT.day} />
      <CapabilityList className="pt-18 md:pt-24" content={SERVICE_ENGAGEMENT.capabilities} />
      <AnnotatedConversation id="conversation" content={SERVICE_ENGAGEMENT.conversation} />
      <BoundarySplit content={SERVICE_ENGAGEMENT.boundaries} />
      <ApproachSteps content={SERVICE_ENGAGEMENT.approach} />
      <ToolsAndProof content={SERVICE_ENGAGEMENT.tools} />
      <ClosingCTA id="service-cta-title" {...SERVICE_ENGAGEMENT.closing} />
    </div>
  );
}
