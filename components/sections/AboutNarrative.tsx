"use client";

import { motion } from "motion/react";
import { SectionContainer } from "@/components/shared/SectionContainer";
import { ABOUT_NARRATIVE } from "@/lib/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function AboutNarrative() {
  return (
    <SectionContainer className="pt-0 md:pt-0">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-3xl space-y-7"
      >
        {ABOUT_NARRATIVE.map((paragraph, i) => (
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
