import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRIMARY_CTA } from "@/lib/constants";
import { HOME_MID_CTA } from "@/lib/content";

/** A modest prompt that continues the process band, so it never competes with the closing band. */
export function MidPageCTA() {
  const { title, body } = HOME_MID_CTA;

  return (
    <section aria-labelledby="mid-cta-title" className="bg-deep-cream">
      <div className="mx-auto max-w-6xl px-6 pb-18 md:px-8 md:pb-24">
        <div className="grid grid-cols-1 items-center gap-6 border-t border-rule pt-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 *:min-w-0">
          <div>
            <h2
              id="mid-cta-title"
              className="font-display text-[1.5rem] font-bold leading-tight tracking-[-0.01em] text-balance md:text-[1.75rem]"
            >
              {title}
            </h2>
            <p className="mt-2 max-w-[56ch] leading-relaxed text-ink-soft">{body}</p>
          </div>
          <Button
            asChild
            variant="coral"
            className="h-auto min-h-13.5 w-full rounded-[10px] px-6.5 py-3 text-center text-base whitespace-normal md:w-auto"
          >
            <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.shortLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
