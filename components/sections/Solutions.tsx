"use client";

import { motion } from "motion/react";
import {
  Headphones,
  Mail,
  MessageSquare,
  Sparkles,
  Target,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EyebrowTag } from "@/components/shared/EyebrowTag";
import { YoutubeLoop } from "@/components/shared/YoutubeLoop";
import {
  SOLUTIONS,
  SOLUTIONS_COPY,
  SOLUTIONS_FEATURED,
  SOLUTIONS_SURVEY_COPY,
} from "@/lib/content";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Users,
  Mail,
  MessageSquare,
  Headphones,
  Target,
  Video,
};

export function Solutions() {
  const FeaturedIcon = ICONS[SOLUTIONS_FEATURED.icon];

  return (
    <SectionContainer id="solutions">
      <SectionHeading
        eyebrow={<EyebrowTag>{SOLUTIONS_COPY.eyebrow}</EyebrowTag>}
        title={SOLUTIONS_COPY.title}
        description={SOLUTIONS_COPY.description}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative mt-16 overflow-hidden rounded-3xl bg-foreground text-background ring-1 ring-foreground/20"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(241,117,88,0.25),transparent_60%)]"
        />
        <div className="relative grid gap-8 p-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12 md:p-12">
          <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-background/10 text-background ring-1 ring-background/20">
            {FeaturedIcon ? (
              <FeaturedIcon className="size-7" strokeWidth={1.5} />
            ) : null}
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-background/60">
              Front and center
            </p>
            <h3 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {SOLUTIONS_FEATURED.title}
            </h3>
            <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-background/75 md:text-lg">
              {SOLUTIONS_FEATURED.description}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-6"
      >
        <YoutubeLoop
          videoId="bjfNFUCjJLU"
          startSeconds={53}
          title="KAP Enterprises automation in action"
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {SOLUTIONS.map(({ icon, title, description }) => {
          const Icon = ICONS[icon];
          return (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group rounded-2xl bg-card p-7 ring-1 ring-foreground/8 transition duration-300 hover:ring-foreground/20"
            >
              <div className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition duration-300 group-hover:bg-accent/15">
                {Icon ? <Icon className="size-5" strokeWidth={1.75} /> : null}
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-10"
      >
        <div className="relative overflow-hidden rounded-3xl bg-card text-center ring-1 ring-foreground/8">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(241,117,88,0.14),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-2xl px-6 py-12 md:px-10 md:py-16">
            <EyebrowTag tone="accent">
              {SOLUTIONS_SURVEY_COPY.eyebrow}
            </EyebrowTag>
            <h3 className="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {SOLUTIONS_SURVEY_COPY.title}
            </h3>
            <p className="mx-auto mt-4 text-balance text-base text-muted-foreground md:text-lg">
              {SOLUTIONS_SURVEY_COPY.description}
            </p>
            <div className="mt-7">
              <Button asChild className="h-12 px-7 text-sm font-semibold">
                <a
                  href={SOLUTIONS_SURVEY_COPY.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SOLUTIONS_SURVEY_COPY.cta.label}
                </a>
              </Button>
            </div>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/55">
              {SOLUTIONS_SURVEY_COPY.reassurance}
            </p>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
