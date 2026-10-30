import Link from "next/link";
import { ArrowRight, Blocks, Globe, Megaphone, MessagesSquare, Workflow } from "lucide-react";
import { HOME_SERVICES, type Service } from "@/lib/content";
import { cn } from "@/lib/utils";
import { HomeHeading } from "./HomeHeading";
import h from "@/components/shared/optimism.module.css";

const icons: Record<Service["icon"], typeof Workflow> = {
  Workflow,
  MessagesSquare,
  Megaphone,
  Blocks,
  Globe,
};

/** AI workflow automation leads at full weight; the other four follow as a compact list. */
export function ServicesSection() {
  const { title, intro, featured, others } = HOME_SERVICES;
  const FeaturedIcon = icons[featured.icon];

  return (
    <section id="solutions" aria-labelledby="services-title" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 pb-18 md:px-8 md:pb-24">
        <HomeHeading id="services-title">{title}</HomeHeading>
        <p className="mt-5 max-w-[56ch] text-[1.05rem] leading-relaxed text-ink-soft md:text-lg">
          {intro}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <article
            className={cn(
              "relative overflow-hidden rounded-[20px] border border-rule bg-paper p-7 md:p-9 lg:col-span-7",
              h.accentEdge,
            )}
          >
            <div className="flex size-12 items-center justify-center rounded-[10px] bg-brand-magenta text-brand-cream">
              <FeaturedIcon aria-hidden className="size-6" />
            </div>
            <h3 className="mt-6 font-display text-[clamp(1.6rem,1.2rem+1vw,2.1rem)] font-bold leading-tight tracking-[-0.015em]">
              {featured.title}
            </h3>
            <p className="mt-3 max-w-[44ch] text-[1.05rem] leading-relaxed text-ink-soft">
              {featured.description}
            </p>
            <ul className="mt-7 grid gap-3 border-t border-rule pt-6">
              {featured.points.map((point) => (
                <li key={point} className="flex items-start gap-3 font-medium">
                  <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-coral-ink" />
                  {point}
                </li>
              ))}
            </ul>
            {featured.link ? (
              <Link
                href={featured.link.href}
                className="mt-7 inline-flex items-center gap-2 rounded-sm border-b border-foreground/40 pb-0.5 font-semibold transition-colors duration-150 hover:border-coral-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
              >
                {featured.link.label}
                <ArrowRight aria-hidden className="size-4 text-coral-ink" />
              </Link>
            ) : null}
          </article>

          <ul className="divide-y divide-rule border-y border-rule lg:col-span-5">
            {others.map((service) => {
              const Icon = icons[service.icon];
              return (
                <li key={service.title} className="flex gap-4 py-6">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-deep-cream text-coral-ink">
                    <Icon aria-hidden className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-[1.05rem] font-semibold leading-snug">{service.title}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">
                      {service.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
