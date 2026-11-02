"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Wraps the workflow figure and controls its CSS animation cycle: it pauses the cycle while the
 * page is hidden or the figure is off screen, and restarts every stage together when the layout
 * switches between the phone and wider diagrams (each uses different connector elements, which
 * would otherwise start out of step).
 * Pass `layoutQuery={null}` when the figure has no layout-specific animations to resync.
 * Pass `pauseControl` to add a visitor Pause/Play button. A visitor's pause holds the current
 * frame and outlasts any visibility change; only their own Play resumes the cycle.
 * Reduced motion needs nothing here: the CSS only animates under no-preference. It also decides
 * whether the button shows, using `data-motion-ready` so it never appears before it can work.
 */
export function WorkflowMotion({
  className,
  labelledBy,
  layoutQuery = "(width < 48rem)",
  pauseControl,
  children,
}: {
  className?: string;
  labelledBy: string;
  /** Media query at which the diagram switches layout (and so its connector elements) */
  layoutQuery?: string | null;
  pauseControl?: {
    className: string;
    pause: { text: string; label: string };
    play: { text: string; label: string };
  };
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const pausedByVisitor = useRef(false);
  const applyPause = useRef<() => void>(() => {});
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pageHidden = document.hidden;
    let offscreen = false;
    const apply = () =>
      el.toggleAttribute("data-paused", pausedByVisitor.current || pageHidden || offscreen);
    applyPause.current = apply;

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
    const layout = layoutQuery ? window.matchMedia(layoutQuery) : null;
    const restart = () => {
      cancelAnimationFrame(frame);
      // Next frame, so animations on newly displayed connector pieces exist before resetting.
      frame = requestAnimationFrame(() => {
        el.getAnimations({ subtree: true }).forEach((animation) => {
          animation.currentTime = 0;
        });
      });
    };
    layout?.addEventListener("change", restart);

    apply();
    el.toggleAttribute("data-motion-ready", true);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
      layout?.removeEventListener("change", restart);
      cancelAnimationFrame(frame);
    };
  }, [layoutQuery]);

  function togglePause() {
    pausedByVisitor.current = !pausedByVisitor.current;
    setPaused(pausedByVisitor.current);
    applyPause.current();
  }

  const action = paused ? pauseControl?.play : pauseControl?.pause;
  const Icon = paused ? Play : Pause;

  return (
    <figure ref={ref} className={className} aria-labelledby={labelledBy}>
      {pauseControl && action ? (
        <button type="button" className={pauseControl.className} aria-label={action.label} onClick={togglePause}>
          <Icon aria-hidden />
          <span>{action.text}</span>
        </button>
      ) : null}
      {children}
    </figure>
  );
}
