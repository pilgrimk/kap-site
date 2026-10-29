import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HOME_FINAL_CTA } from "@/lib/content";
import { CONTACT_EMAIL, PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import h from "./home.module.css";

/** The page's one dramatic charcoal band: the contact form first, the verified email second. */
export function HomeFinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className={cn("relative overflow-hidden bg-brand-charcoal text-brand-cream", h.accentEdge)}
    >
      {/* grid-cols-1 + min-w-0: the single column must not grow to the button's width */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-end gap-10 px-6 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] *:min-w-0">
        <div>
          <h2
            id="final-cta-title"
            className="font-display text-[clamp(2.25rem,1.3rem+2.6vw,3.75rem)] font-bold leading-[1.04] tracking-tight text-balance"
          >
            {HOME_FINAL_CTA.title}
          </h2>
          <p className="mt-5 max-w-[44ch] text-[1.05rem] leading-[1.55] text-brand-cream/75 md:text-[1.15rem]">
            {HOME_FINAL_CTA.body}
          </p>
        </div>
        <div className="lg:justify-self-end">
          <Button
            asChild
            variant="coral"
            className="h-auto min-h-13.5 w-full rounded-[10px] px-6.5 py-3 text-center text-base whitespace-normal focus-visible:ring-brand-cream/70 md:w-auto"
          >
            <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
          </Button>
          <p className="mt-5 text-[0.95rem] text-brand-cream/75">
            {HOME_FINAL_CTA.emailLead}{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-sm font-semibold wrap-anywhere text-brand-cream underline decoration-brand-cream/40 underline-offset-4 transition-colors duration-150 hover:decoration-brand-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cream"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
