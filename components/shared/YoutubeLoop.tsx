"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLIFrameElement | HTMLElement | string,
        config: {
          events?: {
            onReady?: (event: { target: YouTubePlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        },
      ) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type YouTubePlayer = {
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  playVideo: () => void;
};

const ENDED = 0;

let apiPromise: Promise<void> | null = null;

function loadYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);
  });
  return apiPromise;
}

export function YoutubeLoop({
  videoId,
  startSeconds = 0,
  title,
  className,
}: {
  videoId: string;
  startSeconds?: number;
  title: string;
  className?: string;
}) {
  const reactId = useId();
  const playerId = `yt-${reactId.replace(/:/g, "")}`;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadYouTubeAPI().then(() => {
      if (cancelled || !iframeRef.current || !window.YT) return;
      const player = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: () => {
            if (cancelled) return;
            setReady(true);
            setMuted(player.isMuted());
          },
          onStateChange: (event) => {
            if (event.data === ENDED && startSeconds > 0) {
              player.seekTo(startSeconds, true);
              player.playVideo();
            }
          },
        },
      });
      playerRef.current = player;
    });
    return () => {
      cancelled = true;
      playerRef.current = null;
    };
  }, [startSeconds]);

  const toggle = () => {
    const player = playerRef.current;
    if (!player) return;
    if (player.isMuted()) {
      player.unMute();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  };

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: videoId,
    controls: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    enablejsapi: "1",
    start: String(startSeconds),
  });

  return (
    <div
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-3xl bg-foreground ring-1 ring-foreground/15",
        className,
      )}
    >
      <iframe
        ref={iframeRef}
        id={playerId}
        title={title}
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <button
        type="button"
        onClick={toggle}
        disabled={!ready}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute inset-0 flex cursor-pointer items-end justify-end p-4 transition focus-visible:outline-none md:p-6"
      >
        <span
          className={cn(
            "pointer-events-none inline-flex items-center gap-2 rounded-full bg-background/95 px-4 py-2 text-xs font-medium text-foreground shadow-lg ring-1 ring-foreground/10 backdrop-blur transition-opacity duration-300",
            muted
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
          )}
        >
          {muted ? (
            <>
              <VolumeX className="size-4" strokeWidth={2} />
              <span>Tap for sound</span>
            </>
          ) : (
            <>
              <Volume2 className="size-4" strokeWidth={2} />
              <span>Mute</span>
            </>
          )}
        </span>
      </button>
    </div>
  );
}
