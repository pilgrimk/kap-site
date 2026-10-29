import type { Variants } from "motion/react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// "hidden" states keep full opacity: Motion renders them into the server HTML,
// so an opacity of 0 left content invisible until JavaScript ran. Content now
// starts visible and only the rise animates.

export const fadeUp: Variants = {
  hidden: { opacity: 1, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { duration: 0.6, ease: easeOutExpo } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const viewportOnce = { once: true, amount: 0.25 } as const;
