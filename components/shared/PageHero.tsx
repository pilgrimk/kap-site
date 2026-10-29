"use client";

import { motion } from "motion/react";
import { EyebrowTag } from "@/components/shared/EyebrowTag";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-12%] h-[520px] w-[75%] bg-[radial-gradient(ellipse_at_center,rgba(241,117,88,0.18),transparent_65%)]" />
        <div className="absolute -top-10 left-[-10%] h-[400px] w-[55%] bg-[radial-gradient(ellipse_at_center,rgba(177,41,110,0.08),transparent_70%)]" />
      </div>
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:px-8 md:pt-32 md:pb-24">
        {/* initial={false}: the hero renders in its final position, with no
            entrance movement before or after JavaScript loads. */}
        <motion.div
          initial={false}
          animate="show"
          variants={staggerContainer}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp}>
            <EyebrowTag>{eyebrow}</EyebrowTag>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl"
          >
            {title}
          </motion.h1>
          {description ? (
            <motion.p
              variants={fadeUp}
              className="mt-6 text-balance text-base text-muted-foreground md:text-lg"
            >
              {description}
            </motion.p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
