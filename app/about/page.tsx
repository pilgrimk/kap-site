import type { Metadata } from "next";
import { bricolage } from "@/lib/fonts";
import { ABOUT_PAGE } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutWhy } from "@/components/sections/about/AboutWhy";
import { AboutFounder } from "@/components/sections/about/AboutFounder";
import { AboutApproach } from "@/components/sections/about/AboutApproach";
import { AboutServices } from "@/components/sections/about/AboutServices";
import { AboutTrust } from "@/components/sections/about/AboutTrust";
import { ClosingCTA } from "@/components/shared/ClosingCTA";

const { path, meta } = ABOUT_PAGE;

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

// Only facts the page states: the business, its site and its founder.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_URL}${path}`,
  description: meta.description,
  mainEntity: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    founder: { "@type": "Person", name: ABOUT_PAGE.founder.name },
  },
};

export default function AboutPage() {
  return (
    <div className={bricolage.variable}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <AboutHero content={ABOUT_PAGE.hero} />
      <AboutWhy content={ABOUT_PAGE.why} />
      <AboutFounder id="founder" content={ABOUT_PAGE.founder} />
      <AboutApproach content={ABOUT_PAGE.approach} />
      <AboutServices content={ABOUT_PAGE.services} />
      <AboutTrust content={ABOUT_PAGE.trust} />
      <ClosingCTA id="about-cta-title" {...ABOUT_PAGE.closing} />
    </div>
  );
}
