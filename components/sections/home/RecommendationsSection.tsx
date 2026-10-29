import { HOME_RECOMMENDATIONS, type Recommendation } from "@/lib/content";
import { cn } from "@/lib/utils";
import { HomeHeading } from "./HomeHeading";

function Attribution({ item }: { item: Recommendation }) {
  return (
    <figcaption className="mt-5">
      <p className="font-semibold">{item.author}</p>
      <p className="text-sm text-ink-soft">
        {item.role}, {item.company}
      </p>
      <p className="mt-1 text-sm font-medium text-brand-magenta">{item.relationship}</p>
    </figcaption>
  );
}

/** Verbatim excerpts only; the lead quote carries the most weight. */
export function RecommendationsSection() {
  const [lead, ...rest] = HOME_RECOMMENDATIONS.items;

  return (
    <section aria-labelledby="recommendations-title" className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 py-18 md:px-8 md:py-24">
        <HomeHeading id="recommendations-title">{HOME_RECOMMENDATIONS.title}</HomeHeading>
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <figure className="lg:col-span-7">
            <blockquote className="font-display text-[clamp(1.5rem,1.1rem+1.2vw,2.1rem)] font-semibold leading-snug tracking-[-0.01em]">
              <p>&ldquo;{lead.quote}&rdquo;</p>
            </blockquote>
            <Attribution item={lead} />
          </figure>
          <div className="grid gap-10 lg:col-span-5 lg:border-l lg:border-rule lg:pl-12">
            {rest.map((item, i) => (
              <figure key={item.author} className={cn(i > 0 && "border-t border-rule pt-10")}>
                <blockquote className="text-[1.1rem] leading-relaxed">
                  <p>&ldquo;{item.quote}&rdquo;</p>
                </blockquote>
                <Attribution item={item} />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
