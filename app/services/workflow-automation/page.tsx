import type { Metadata } from "next";
import { bricolage } from "@/lib/fonts";
import { SERVICE_WORKFLOW } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ScenarioGrid } from "@/components/sections/services/ScenarioGrid";
import { CapabilityList } from "@/components/sections/services/CapabilityList";
import { LinearWorkflow } from "@/components/sections/services/LinearWorkflow";
import { ApproachSteps } from "@/components/sections/services/ApproachSteps";
import { ToolsAndProof } from "@/components/sections/services/ToolsAndProof";
import { ClosingCTA } from "@/components/shared/ClosingCTA";

const { path, meta } = SERVICE_WORKFLOW;

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
  serviceType: "Business process automation",
  description: meta.description,
  url: `${SITE_URL}${path}`,
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

export default function WorkflowAutomationPage() {
  return (
    <div className={bricolage.variable}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ServiceHero content={SERVICE_WORKFLOW.hero} />
      <ScenarioGrid content={SERVICE_WORKFLOW.scenarios} />
      <CapabilityList content={SERVICE_WORKFLOW.capabilities} />
      <LinearWorkflow id="example" content={SERVICE_WORKFLOW.example} />
      <ApproachSteps content={SERVICE_WORKFLOW.approach} />
      <ToolsAndProof content={SERVICE_WORKFLOW.tools} />
      <ClosingCTA id="service-cta-title" {...SERVICE_WORKFLOW.closing} />
    </div>
  );
}
