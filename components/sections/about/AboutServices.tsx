import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ABOUT_PAGE } from "@/lib/content";
import { HomeHeading } from "../home/HomeHeading";
import { serviceIcons } from "../services/icons";

type ServicesContent = (typeof ABOUT_PAGE)["services"];

/**
 * The three services with their own pages, each card led by that page's headline. The whole card
 * is clickable through the title link's stretched hit area; the other capabilities are named
 * without pages of their own.
 */
export function AboutServices({ content }: { content: ServicesContent }) {
  return (
    <section aria-labelledby="about-services-title" className="bg-brand-charcoal text-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <HomeHeading id="about-services-title">{content.title}</HomeHeading>
        <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-[1.6] text-brand-cream/75 md:text-[1.15rem]">
          {content.intro}
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {content.items.map((item) => {
            const Icon = serviceIcons[item.icon];
            return (
              <li
                key={item.href}
                className="group relative flex flex-col rounded-[20px] border border-brand-cream/12 bg-[#232323] p-6 transition-colors duration-200 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-brand-cream md:p-7 [@media(hover:hover)_and_(pointer:fine)]:hover:border-brand-cream/35"
              >
                <span
                  aria-hidden
                  className="flex size-10 items-center justify-center rounded-[10px] bg-brand-amber/15 text-brand-amber"
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 text-sm font-semibold text-brand-cream/70">
                  <Link
                    href={item.href}
                    className="rounded-sm after:absolute after:inset-0 after:rounded-[20px] after:content-[''] focus-visible:outline-none"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 font-display text-[1.45rem] font-bold leading-[1.12] tracking-[-0.015em] text-balance">
                  {item.headline}
                </p>
                <p className="mt-4 leading-relaxed text-brand-cream/70">{item.description}</p>
                <span
                  aria-hidden
                  className="mt-auto inline-flex items-center gap-2 pt-7 text-[0.9375rem] font-semibold text-brand-coral"
                >
                  Explore
                  <ArrowRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-has-[a:focus-visible]:translate-x-0.5 motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5" />
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 max-w-[62ch] leading-relaxed text-brand-cream/75">
          {content.others}{" "}
          <Link
            href={content.othersLink.href}
            className="rounded-sm font-semibold text-brand-cream underline decoration-brand-cream/40 underline-offset-4 transition-colors duration-150 hover:decoration-brand-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cream"
          >
            {content.othersLink.label}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
