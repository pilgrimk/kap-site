"use client";

import { useRef } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import s from "./site.module.css";

/**
 * Two-state comparison: the left layer is clipped to the slider position over the right layer.
 * A native range input covers the whole picture, so it drags with a pointer or touch and moves
 * with the arrow keys. The position is written straight to a CSS variable, never to React state.
 * Without JavaScript, both halves stay visible at the midpoint.
 */
export function CompareSlider({
  left,
  right,
  label,
  leftLabel,
  rightLabel,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  label: string;
  leftLabel: string;
  rightLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={s.compare}>
      <div className={s.layer}>{right}</div>
      <div className={cn(s.layer, s.leftLayer)}>{left}</div>
      <span aria-hidden className={cn(s.tag, s.tagLeft)}>
        {leftLabel}
      </span>
      <span aria-hidden className={cn(s.tag, s.tagRight)}>
        {rightLabel}
      </span>
      <input
        type="range"
        min={0}
        max={100}
        defaultValue={50}
        aria-label={label}
        className={s.range}
        onInput={(event) => {
          const value = event.currentTarget.valueAsNumber;
          ref.current?.style.setProperty("--pos", `${value}%`);
          event.currentTarget.setAttribute("aria-valuetext", `${leftLabel} ${value}%, ${rightLabel} ${100 - value}%`);
        }}
      />
      <span aria-hidden className={s.handle}>
        <span className={s.knob}>
          <ChevronsLeftRight className="size-5" />
        </span>
      </span>
    </div>
  );
}
