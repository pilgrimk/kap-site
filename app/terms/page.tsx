import type { Metadata } from "next";
import { bricolage } from "@/lib/fonts";
import { LegalDocument } from "@/components/shared/LegalDocument";
import { TERMS_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: TERMS_PAGE.meta.title,
  description: TERMS_PAGE.meta.description,
  alternates: { canonical: TERMS_PAGE.path },
};

export default function TermsPage() {
  return (
    <div className={bricolage.variable}>
      <LegalDocument doc={TERMS_PAGE} />
    </div>
  );
}
