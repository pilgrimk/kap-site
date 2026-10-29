"use client";

import { motion } from "motion/react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EyebrowTag } from "@/components/shared/EyebrowTag";
import { ABOUT_PRINCIPLES, ABOUT_PRINCIPLES_COPY } from "@/lib/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function AboutPrinciples() {
  return (
    <section className="border-y border-border/60 bg-card">
      <SectionContainer as="div">
        <SectionHeading
          eyebrow={<EyebrowTag>{ABOUT_PRINCIPLES_COPY.eyebrow}</EyebrowTag>}
          title={ABOUT_PRINCIPLES_COPY.title}
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {ABOUT_PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="rounded-2xl bg-background p-8 ring-1 ring-foreground/8"
            >
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-foreground/70">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </SectionContainer>
    </section>
  );
}
