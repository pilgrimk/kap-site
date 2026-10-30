"use client";

import { useEffect, useRef } from "react";
import { RotateCcw } from "lucide-react";

/**
 * Restarts the CSS animations of the figure it sits in. It renders hidden and is revealed once
 * hydrated, so it never appears without the script that makes it work, and it stays hidden for
 * reduced-motion visitors, who see the finished conversation.
 */
export function ReplayButton({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    ref.current?.removeAttribute("hidden");
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      hidden
      aria-label={label}
      onClick={(event) => {
        event.currentTarget
          .closest("figure")
          ?.getAnimations({ subtree: true })
          .forEach((animation) => {
            animation.currentTime = 0;
          });
      }}
      className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-rule px-3 py-1.5 text-[0.8125rem] font-semibold transition-[background-color,transform] duration-150 ease-out hover:bg-deep-cream active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:hidden"
    >
      <RotateCcw aria-hidden className="size-3.5" />
      {children}
    </button>
  );
}
