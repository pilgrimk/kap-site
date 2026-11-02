import type { Metadata } from "next";
import { bricolage } from "@/lib/fonts";
import { LegalDocument } from "@/components/shared/LegalDocument";
import { PRIVACY_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: PRIVACY_PAGE.meta.title,
  description: PRIVACY_PAGE.meta.description,
  alternates: { canonical: PRIVACY_PAGE.path },
  // Draft until reviewed (brief A9): kept out of search and the sitemap.
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className={bricolage.variable}>
      <LegalDocument doc={PRIVACY_PAGE} />
    </div>
  );
}
