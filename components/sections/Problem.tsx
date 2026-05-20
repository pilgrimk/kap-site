"use client";

import { motion } from "motion/react";
import { Clock, Lightbulb, TrendingDown, type LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EyebrowTag } from "@/components/shared/EyebrowTag";
import { PROBLEM_COPY, PROBLEMS } from "@/lib/content";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";

const ICONS: Record<string, LucideIcon> = {
  Clock,
  TrendingDown,
  Lightbulb,
};

export function Problem() {
  return (
    <section className="border-y border-border/60 bg-card">
      <SectionContainer as="div">
        <SectionHeading
          eyebrow={<EyebrowTag>{PROBLEM_COPY.eyebrow}</EyebrowTag>}
          title={PROBLEM_COPY.title}
          description={PROBLEM_COPY.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {PROBLEMS.map(({ icon, title, body }) => {
            const Icon = ICONS[icon];
            return (
              <motion.div
                key={title}
                variants={fadeUp}
                className="rounded-2xl bg-background p-8 ring-1 ring-foreground/8 transition duration-300 hover:ring-foreground/15"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/8 text-primary ring-1 ring-primary/15">
                  {Icon ? <Icon className="size-5" strokeWidth={1.75} /> : null}
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </SectionContainer>
    </section>
  );
}
