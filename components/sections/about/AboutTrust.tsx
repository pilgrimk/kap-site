import type { ABOUT_PAGE } from "@/lib/content";
import { HomeHeading } from "../home/HomeHeading";

type TrustContent = (typeof ABOUT_PAGE)["trust"];

/** Verbatim recommendation excerpts, each attributed with the writer's relationship to Kevin. */
export function AboutTrust({ content }: { content: TrustContent }) {
  return (
    <section aria-labelledby="trust-title">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <HomeHeading id="trust-title">{content.title}</HomeHeading>
        <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-[1.6] text-ink-soft md:text-[1.15rem]">
          {content.intro}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {content.items.map((item) => (
            <figure key={item.author} className="flex flex-col border-t-2 border-brand-magenta pt-6">
              <span aria-hidden className="font-display text-5xl leading-[0.6] font-bold text-brand-magenta">
                &ldquo;
              </span>
              <blockquote className="mt-3 text-[1.1rem] leading-relaxed">
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className="mt-auto pt-6">
                <p className="font-semibold">{item.author}</p>
                <p className="text-sm text-ink-soft">
                  {item.role}, {item.company}
                </p>
                <p className="mt-1 text-sm font-medium text-brand-magenta">{item.relationship}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
