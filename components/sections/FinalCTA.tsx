"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { EyebrowTag } from "@/components/shared/EyebrowTag";
import { FINAL_CTA_COPY } from "@/lib/content";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(177,41,110,0.45),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(241,117,88,0.28),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:px-8 md:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp}>
            <EyebrowTag tone="accent" className="text-background/70">
              {FINAL_CTA_COPY.eyebrow}
            </EyebrowTag>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl"
          >
            {FINAL_CTA_COPY.headline}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-balance text-base text-background/75 md:text-lg"
          >
            {FINAL_CTA_COPY.subhead}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button asChild className="h-12 px-7 text-sm font-semibold">
              <Link href={FINAL_CTA_COPY.primary.href}>
                {FINAL_CTA_COPY.primary.label}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 border-background/30 bg-transparent px-7 text-sm font-semibold text-background hover:bg-background/10 hover:text-background"
            >
              <Link href={FINAL_CTA_COPY.secondary.href}>
                {FINAL_CTA_COPY.secondary.label}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
