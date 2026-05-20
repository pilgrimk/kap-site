"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EyebrowTag } from "@/components/shared/EyebrowTag";
import { TESTIMONIALS, TESTIMONIALS_COPY } from "@/lib/content";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";

export function Testimonials() {
  return (
    <section className="border-y border-border/60 bg-card">
      <SectionContainer as="div">
        <SectionHeading
          eyebrow={<EyebrowTag>{TESTIMONIALS_COPY.eyebrow}</EyebrowTag>}
          title={TESTIMONIALS_COPY.title}
          description={TESTIMONIALS_COPY.description}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.author}
              variants={fadeUp}
              className="flex flex-col rounded-2xl bg-background p-8 ring-1 ring-foreground/8"
            >
              <Quote
                className="size-6 text-primary"
                strokeWidth={1.5}
                aria-hidden
              />
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-foreground/85">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border/60 pt-5">
                <div className="text-sm font-semibold text-foreground">
                  {t.author}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {t.title}
                  <span className="mx-1.5 text-foreground/30">·</span>
                  {t.company}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </SectionContainer>
    </section>
  );
}
