"use client";

import { motion } from "motion/react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EyebrowTag } from "@/components/shared/EyebrowTag";
import { ABOUT_BENEFITS } from "@/lib/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function AboutFoundation() {
  return (
    <SectionContainer>
      <SectionHeading
        eyebrow={<EyebrowTag>{ABOUT_BENEFITS.eyebrow}</EyebrowTag>}
        title={ABOUT_BENEFITS.title}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto mt-12 max-w-3xl space-y-7"
      >
        {ABOUT_BENEFITS.paragraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            variants={fadeUp}
            className="text-pretty text-base leading-relaxed text-foreground/85 md:text-lg"
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>
    </SectionContainer>
  );
}
