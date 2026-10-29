"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps the workflow figure and controls its CSS animation cycle without React state, so it
 * never re-renders: it pauses the cycle while the page is hidden or the figure is off screen,
 * and restarts every stage together when the layout switches between the phone and wider
 * diagrams (each uses different connector elements, which would otherwise start out of step).
 * Reduced motion needs nothing here: the CSS only animates under no-preference.
 */
export function WorkflowMotion({
  className,
  labelledBy,
  children,
}: {
  className?: string;
  labelledBy: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pageHidden = document.hidden;
    let offscreen = false;
    const apply = () => el.toggleAttribute("data-paused", pageHidden || offscreen);

    const onVisibility = () => {
      pageHidden = document.hidden;
      apply();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(([entry]) => {
      offscreen = !entry.isIntersecting;
      apply();
    });
    observer.observe(el);

    let frame = 0;
    const layout = window.matchMedia("(width < 48rem)");
    const restart = () => {
      cancelAnimationFrame(frame);
      // Next frame, so animations on newly displayed connector pieces exist before resetting.
      frame = requestAnimationFrame(() => {
        el.getAnimations({ subtree: true }).forEach((animation) => {
          animation.currentTime = 0;
        });
      });
    };
    layout.addEventListener("change", restart);

    apply();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
      layout.removeEventListener("change", restart);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <figure ref={ref} className={className} aria-labelledby={labelledBy}>
      {children}
    </figure>
  );
}
