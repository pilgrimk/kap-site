import type { Metadata } from "next";
import { bricolage } from "@/lib/fonts";
import { SERVICE_WEBSITES } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { WebsiteHero } from "@/components/sections/services/WebsiteHero";
import { BeforeAfter } from "@/components/sections/services/BeforeAfter";
import { QualityBento } from "@/components/sections/services/QualityBento";
import { ApproachSteps } from "@/components/sections/services/ApproachSteps";
import { SiteShowcase } from "@/components/sections/services/SiteShowcase";
import { ConnectedSite } from "@/components/sections/services/ConnectedSite";
import { DesignEvolution } from "@/components/sections/services/DesignEvolution";
import { ClosingCTA } from "@/components/shared/ClosingCTA";

const { path, meta } = SERVICE_WEBSITES;

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
  serviceType: "Website design and development",
  description: meta.description,
  url: `${SITE_URL}${path}`,
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

export default function WebsitesPage() {
  return (
    <div className={bricolage.variable}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <WebsiteHero content={SERVICE_WEBSITES.hero} />
      <BeforeAfter id="compare" content={SERVICE_WEBSITES.compare} site={SERVICE_WEBSITES.hero.site} />
      <QualityBento content={SERVICE_WEBSITES.qualities} />
      <ApproachSteps
        content={SERVICE_WEBSITES.approach}
        aside={<DesignEvolution site={SERVICE_WEBSITES.hero.site} content={SERVICE_WEBSITES.approach.evolution} />}
      />
      <SiteShowcase id="our-site" content={SERVICE_WEBSITES.showcase} />
      <ConnectedSite content={SERVICE_WEBSITES.connect} />
      <ClosingCTA id="service-cta-title" {...SERVICE_WEBSITES.closing} />
    </div>
  );
}
