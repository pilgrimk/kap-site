"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { EyebrowTag } from "@/components/shared/EyebrowTag";
import { HERO_COPY, HERO_TRUST } from "@/lib/content";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-15%] h-[680px] w-[85%] bg-[radial-gradient(ellipse_at_center,rgba(241,117,88,0.22),transparent_65%)]" />
        <div className="absolute top-[-10%] left-[-10%] h-[520px] w-[60%] bg-[radial-gradient(ellipse_at_center,rgba(177,41,110,0.09),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-24 pb-32 md:px-8 md:pt-32 md:pb-40">
        {/* initial={false}: the hero renders in its final position, with no
            entrance movement before or after JavaScript loads. */}
        <motion.div
          initial={false}
          animate="show"
          variants={staggerContainer}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp}>
            <EyebrowTag>{HERO_COPY.eyebrow}</EyebrowTag>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl"
          >
            {HERO_COPY.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl"
          >
            {HERO_COPY.subhead}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button asChild className="h-12 px-7 text-sm font-semibold">
              <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 px-7 text-sm font-semibold"
            >
              <Link href={SECONDARY_CTA.href}>{SECONDARY_CTA.label}</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/70"
          >
            {HERO_TRUST.map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                {i > 0 ? (
                  <span
                    className="size-1 rounded-full bg-foreground/30"
                    aria-hidden
                  />
                ) : null}
                <span>{item}</span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
