"use client";

import { useEffect, useRef, useState } from "react";
import { YoutubeEmbed } from "@/components/shared/YoutubeEmbed";

/**
 * Click-to-play YouTube: renders the given poster as a button and loads nothing from YouTube
 * until the visitor presses it. Then the privacy-enhanced player replaces the poster, starts
 * because the visitor asked it to, and takes keyboard focus.
 */
export function YoutubeFacade({
  videoId,
  title,
  playLabel,
  className,
  posterClassName,
  children,
}: {
  videoId: string;
  title: string;
  /** Accessible name of the play button */
  playLabel: string;
  className?: string;
  posterClassName?: string;
  /** The poster's visual content */
  children: React.ReactNode;
}) {
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playing) frame.current?.querySelector("iframe")?.focus();
  }, [playing]);

  return (
    <div ref={frame} className={className}>
      {playing ? (
        <YoutubeEmbed
          videoId={videoId}
          title={title}
          autoplay
          className="h-full rounded-none ring-0"
        />
      ) : (
        <button
          type="button"
          aria-label={playLabel}
          onClick={() => setPlaying(true)}
          className={posterClassName}
        >
          {children}
        </button>
      )}
    </div>
  );
}
