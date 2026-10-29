import { cn } from "@/lib/utils";

/**
 * A standard, user-controlled YouTube player: no looping, native controls,
 * privacy-enhanced domain, and loaded only as it nears the viewport.
 * `autoplay` is only for players created by the visitor's own click (see
 * YoutubeFacade); a page never starts a video by itself.
 */
export function YoutubeEmbed({
  videoId,
  startSeconds = 0,
  title,
  autoplay = false,
  className,
}: {
  videoId: string;
  startSeconds?: number;
  title: string;
  autoplay?: boolean;
  className?: string;
}) {
  const params = new URLSearchParams({
    controls: "1",
    playsinline: "1",
    rel: "0",
    start: String(startSeconds),
  });
  if (autoplay) params.set("autoplay", "1");

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-3xl bg-foreground ring-1 ring-foreground/15",
        className,
      )}
    >
      <iframe
        title={title}
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`}
        loading="lazy"
        // YouTube requires the embedding page's origin as the referrer.
        referrerPolicy="strict-origin-when-cross-origin"
        allow={`accelerometer; ${autoplay ? "autoplay; " : ""}clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share`}
        allowFullScreen
      />
    </div>
  );
}
