import Link from "next/link";
import type { SiteMock } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BrowserFrame, SiteDesktop, SiteWireframe } from "./SiteMock";
import s from "./site.module.css";

type EvolutionContent = { draft: string; final: string; caption: string };

/**
 * The illustrative site twice, from first layout to finished design, layered so the process reads
 * as one picture; then the primary call to action, partway down the page.
 */
export function DesignEvolution({ site, content }: { site: SiteMock; content: EvolutionContent }) {
  return (
    <div className="mt-10">
      <figure aria-labelledby="evolution-caption" className="m-0">
        <div className="relative pb-[24%]">
          <div className="relative w-[80%]">
            <BrowserFrame url="fernwaylandscaping.example" className="shadow-none">
              <SiteWireframe site={site} />
            </BrowserFrame>
            {/* Top corner: the bottom of this frame sits under the finished design */}
            <span aria-hidden className={cn(s.tag, s.tagLeft)} style={{ top: "2.25rem", bottom: "auto" }}>
              {content.draft}
            </span>
          </div>
          <div className="absolute right-0 bottom-0 w-[80%]">
            <BrowserFrame url="fernwaylandscaping.example">
              <SiteDesktop site={site} />
            </BrowserFrame>
            <span aria-hidden className={cn(s.tag, s.tagRight)}>{content.final}</span>
          </div>
        </div>
        <figcaption id="evolution-caption" className="mt-4 text-[0.8125rem] text-ink-soft">
          {content.caption}
        </figcaption>
      </figure>
      <Button
        asChild
        variant="coral"
        className="mt-8 h-auto min-h-13.5 w-full rounded-[10px] px-6.5 py-3 text-center text-base whitespace-normal md:w-auto"
      >
        <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
      </Button>
    </div>
  );
}
