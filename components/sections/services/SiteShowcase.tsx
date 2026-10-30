import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { HomeHeading } from "@/components/sections/home/HomeHeading";
import { cn } from "@/lib/utils";

type ShowcaseContent = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  tryIt: string;
  screensLabel: string;
  screens: { label: string; href: string; src: string }[];
};

/**
 * KAP's own site as the example: what is true of it, beside real phone captures of its redesigned
 * pages, each linking to that page. Never framed as a client project.
 */
export function SiteShowcase({ id, content }: { id: string; content: ShowcaseContent }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 bg-brand-charcoal text-brand-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-x-16 gap-y-12 px-6 py-18 md:px-8 md:py-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] *:min-w-0">
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-amber md:text-xs">{content.eyebrow}</p>
          <HomeHeading id={`${id}-title`} className="mt-4 text-[clamp(2.4rem,1.4rem+3vw,3.9rem)] leading-[1.02]">
            {content.title}
          </HomeHeading>
          <p className="mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-brand-cream/75 md:text-lg">{content.body}</p>
          <ul className="mt-8 grid gap-4">
            {content.points.map((point) => (
              <li key={point} className="flex gap-3 leading-snug">
                <span className="mt-px flex size-6 shrink-0 items-center justify-center rounded-md bg-brand-amber text-brand-charcoal">
                  <Check aria-hidden className="size-3.5" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.95rem] text-brand-cream/75">{content.tryIt}</p>
        </div>

        <div>
          <p id={`${id}-screens`} className="sr-only">
            {content.screensLabel}
          </p>
          <ul aria-labelledby={`${id}-screens`} className="grid grid-cols-3 gap-3 sm:gap-5">
            {content.screens.map((screen, i) => (
              <li key={screen.href} className={cn(i === 1 && "mt-8 md:mt-14")}>
                <Link
                  href={screen.href}
                  className="group block rounded-[18px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cream"
                >
                  <span className="block overflow-hidden rounded-[14px] border-4 border-brand-cream/15 bg-brand-cream shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)] transition-transform duration-200 ease-out group-hover:-translate-y-1 motion-reduce:transition-none sm:rounded-[20px] sm:border-[6px]">
                    <Image
                      src={screen.src}
                      alt=""
                      width={780}
                      height={1688}
                      sizes="(min-width: 1024px) 200px, 30vw"
                      className="block h-auto w-full"
                    />
                  </span>
                  <span className="mt-3 block text-[0.8125rem] font-semibold leading-snug wrap-break-word sm:text-[0.9375rem]">
                    {screen.label}
                    <ArrowRight aria-hidden className="ml-1 inline size-3.5 -translate-y-px align-middle text-brand-amber transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
