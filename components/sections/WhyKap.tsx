"use client";

import { motion } from "motion/react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EyebrowTag } from "@/components/shared/EyebrowTag";
import { WHY_KAP_COPY, WHY_KAP_STATS } from "@/lib/content";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";

export function WhyKap() {
  return (
    <section className="relative border-y border-border/60 bg-card">
      <SectionContainer as="div">
        <SectionHeading
          eyebrow={<EyebrowTag>{WHY_KAP_COPY.eyebrow}</EyebrowTag>}
          title={WHY_KAP_COPY.title}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-10 max-w-3xl space-y-5 text-center"
        >
          {WHY_KAP_COPY.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-balance text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-border ring-1 ring-border md:grid-cols-3"
        >
          {WHY_KAP_STATS.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="bg-card px-8 py-10 text-center"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/55">
                {label}
              </dt>
              <dd className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                {value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </SectionContainer>
    </section>
  );
}
