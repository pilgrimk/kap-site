import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { YoutubeFacade } from "@/components/shared/YoutubeFacade";
import { HOME_VIDEO } from "@/lib/content";
import { PRIMARY_CTA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { HomeHeading } from "./HomeHeading";
import h from "./home.module.css";

/**
 * KAP's own automation video. Nothing loads from YouTube until the visitor presses Play.
 * Desktop: copy left, player right. Phone: copy, player, then the contact link.
 */
export function VideoSection() {
  const { title, paragraphs, highlight, closing, disclosure, video, summaryLabel, summary } =
    HOME_VIDEO;

  return (
    <section aria-labelledby="video-title">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-14 gap-y-8 px-6 pb-18 md:px-8 md:pb-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center *:min-w-0">
        <div>
          <HomeHeading id="video-title">{title}</HomeHeading>
          <div className="mt-5 grid max-w-[46ch] gap-4 text-[1.05rem] leading-relaxed text-ink-soft">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="font-semibold text-foreground">{highlight}</p>
            <p>{closing}</p>
          </div>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <YoutubeFacade
            videoId={video.id}
            title={`${video.title} (video)`}
            playLabel={`Play video: ${video.title}. Loads the YouTube player.`}
            className={cn(
              "relative aspect-video overflow-hidden rounded-[20px] border border-rule bg-paper",
              h.accentEdge,
            )}
            posterClassName={cn(
              // Small screens: a centred stack. sm+: label top, play centre, title bottom.
              "group absolute inset-0 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3 p-4 text-center focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-foreground sm:grid sm:grid-rows-[auto_1fr_auto] sm:items-stretch sm:justify-normal sm:gap-0 sm:p-7 sm:text-left",
              h.videoPoster,
            )}
          >
            {/* Small screens get a compact poster (title and play button only) so nothing is
                clipped by the 16:9 frame; the button's accessible name carries the full label. */}
            <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft sm:block">
              {video.kicker}
            </span>
            <span className="flex size-12 items-center justify-center place-self-center rounded-full bg-brand-coral text-brand-charcoal shadow-[0_8px_24px_rgba(184,80,58,0.25)] transition-transform duration-150 ease-out group-active:scale-[0.97] sm:size-19 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.04]">
              <Play aria-hidden className="ml-1 size-5 fill-current sm:size-7" />
            </span>
            <span>
              {/* Very narrow screens (or enlarged text on small phones): play button only */}
              <span className="block font-display text-[clamp(1.1rem,0.9rem+1vw,1.6rem)] font-bold tracking-[-0.01em] max-[22.5rem]:hidden">
                {video.title}
              </span>
              <span className="mt-1 hidden text-[0.8125rem] text-ink-soft sm:block">{video.note}</span>
            </span>
          </YoutubeFacade>

          <p className="mt-4 text-[0.875rem] italic leading-normal text-ink-soft">{disclosure}</p>
          <details className="group/summary mt-3 text-[0.875rem] text-ink-soft">
            <summary className="w-fit cursor-pointer rounded-sm font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-coral-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">
              {summaryLabel}
            </summary>
            <p className="mt-2 max-w-[60ch] leading-relaxed">{summary}</p>
          </details>
        </div>

        <div>
          <Link
            href={PRIMARY_CTA.href}
            className="inline-flex items-center gap-2 rounded-sm border-b border-foreground/40 pb-0.5 font-semibold transition-colors duration-150 hover:border-coral-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            {PRIMARY_CTA.label}
            <ArrowRight aria-hidden className="size-4 text-coral-ink" />
          </Link>
        </div>
      </div>
    </section>
  );
}
