"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";
import {
  ANALYTICS_CONSENT_KEY,
  analyticsState,
  googleAnalyticsCookieRemovals,
  parseAnalyticsPreference,
  type AnalyticsPreference,
  type AnalyticsState,
} from "@/lib/analytics-consent";
import { ANALYTICS_CONSENT } from "@/lib/content";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const CONTROL_ID = "cookie-preferences";

// One store for the whole page, shared by the notice and the footer control. "pending" is the
// server's answer and the first render's, so analytics can never start before the choice is read.
type Snapshot = AnalyticsState | "pending";

let current: AnalyticsState | null = null;
let panelOpen = false;
const listeners = new Set<() => void>();

let gaStopped = false;
let hitGuardInstalled = false;

/**
 * Stops or resumes GA in this page. Google's documented flag stops new hits, but hits gtag has already
 * queued still go out seconds later, so those are dropped as well. Nothing else is affected.
 */
function setGaStopped(id: string, stopped: boolean) {
  gaStopped = stopped;
  (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = stopped;
}

/** Runs before gtag.js does, so that gtag only ever sees these versions of fetch and sendBeacon. */
function installGaHitGuard() {
  if (hitGuardInstalled) return;
  hitGuardInstalled = true;
  const isBlockedHit = (url: string) =>
    gaStopped && /^https:\/\/[^/]*(google-analytics\.com|analytics\.google\.com)\//.test(url);

  const realFetch = window.fetch;
  window.fetch = function (input, init) {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    return isBlockedHit(url) ? Promise.resolve(new Response(null, { status: 204 })) : realFetch.call(this, input, init);
  };
  const realBeacon = navigator.sendBeacon;
  navigator.sendBeacon = function (url, data) {
    return isBlockedHit(String(url)) ? true : realBeacon.call(this, url, data);
  };
}

function readState(): AnalyticsState {
  const gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
  try {
    const storage = window.localStorage;
    const raw = storage.getItem(ANALYTICS_CONSENT_KEY);
    // A write proves the choice could be remembered; reading alone can succeed where writing throws.
    const probe = `${ANALYTICS_CONSENT_KEY}.probe`;
    storage.setItem(probe, "1");
    storage.removeItem(probe);
    return analyticsState({ preference: parseAnalyticsPreference(raw), gpc, storageAvailable: true });
  } catch {
    return analyticsState({ preference: null, gpc, storageAvailable: false });
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  // Another tab changing the choice applies here too, so a withdrawal reaches every open page.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== ANALYTICS_CONSENT_KEY) return;
    current = readState();
    if (gaId) setGaStopped(gaId, current !== "accepted");
    emit();
  };
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function getState(): Snapshot {
  current ??= readState();
  return current;
}

const getPending = (): Snapshot => "pending";
const getPanelOpen = () => panelOpen;
const getPanelClosed = () => false;

function setPanelOpen(open: boolean) {
  panelOpen = open;
  emit();
}

/** Saves the visitor's choice. If it cannot be saved, analytics stays off. */
function choose(preference: AnalyticsPreference) {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, preference);
    current = readState();
  } catch {
    current = "unavailable";
  }
  if (gaId) setGaStopped(gaId, current !== "accepted");
  emit();
}

function clearGoogleAnalyticsCookies() {
  for (const removal of googleAnalyticsCookieRemovals(document.cookie, window.location.hostname)) {
    document.cookie = removal;
  }
}

/**
 * The consent notice and the only place Google Analytics loads. It renders GA solely in the
 * "accepted" state, which needs a stored choice and no Global Privacy Control signal. Withdrawing
 * stops GA in place, with no reload, so unsaved form text is never lost: gtag stays in memory until
 * the next full page load but can send nothing, and that next load does not start it.
 */
export function AnalyticsConsent() {
  const state = useSyncExternalStore(subscribe, getState, getPending);
  const isOpen = useSyncExternalStore(subscribe, getPanelOpen, getPanelClosed);
  const gaStarted = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!gaId || state === "pending") return;
    if (state === "accepted") {
      installGaHitGuard();
      // Accepting again on the page where GA was stopped: gtag resumes, but won't count this page by itself.
      if (gaStarted.current) (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.("event", "page_view");
      gaStarted.current = true;
      return;
    }
    setGaStopped(gaId, true);
    clearGoogleAnalyticsCookies();
  }, [state]);

  useEffect(() => {
    if (isOpen) headingRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  if (!gaId || state === "pending") return null;

  const copy = ANALYTICS_CONSENT;
  const canChoose = state !== "gpc" && state !== "unavailable";

  function closePanel() {
    setPanelOpen(false);
    document.getElementById(CONTROL_ID)?.focus({ preventScroll: true });
  }

  function onChoose(preference: AnalyticsPreference) {
    const fromFooter = isOpen;
    choose(preference);
    if (fromFooter) {
      closePanel();
    } else {
      // The notice is about to go, so keyboard focus moves on to the page rather than being lost.
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }
  }

  const status: Partial<Record<AnalyticsState, string>> = {
    accepted: copy.statusAccepted,
    declined: copy.statusDeclined,
    gpc: copy.statusGpc,
    unavailable: copy.statusUnavailable,
  };

  return (
    <>
      {state === "accepted" ? <GoogleAnalytics gaId={gaId} /> : null}

      {state === "undecided" || isOpen ? (
        <section
          aria-labelledby="analytics-consent-title"
          className="fixed inset-x-2 bottom-2 z-60 max-h-[calc(100dvh-1rem)] overflow-y-auto rounded-[14px] border border-rule bg-paper p-3.5 shadow-[0_24px_48px_-24px_rgb(26_26_26/0.4),0_2px_6px_rgb(26_26_26/0.05)] sm:right-4 sm:bottom-4 sm:left-auto sm:w-[26rem] sm:rounded-[16px] sm:p-5"
        >
          {/* Phones: the heading is kept for screen readers and focus, but its line is given back to the page. */}
          <h2
            ref={headingRef}
            id="analytics-consent-title"
            tabIndex={-1}
            className="sr-only font-display text-[1.05rem] font-bold leading-snug focus:outline-none sm:not-sr-only"
          >
            {copy.title}
          </h2>
          <p className="text-[0.875rem] leading-snug text-ink-soft sm:mt-2 sm:text-[0.9375rem] sm:leading-relaxed">
            {copy.body}{" "}
            <Link
              href={copy.privacyHref}
              className="rounded-sm font-semibold text-foreground underline decoration-foreground/40 underline-offset-4 hover:decoration-coral-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              {copy.privacyLabel}
            </Link>
          </p>
          {status[state] ? (
            <p className="mt-2 text-[0.875rem] font-semibold leading-snug text-foreground sm:mt-3 sm:text-[0.9375rem] sm:leading-relaxed">{status[state]}</p>
          ) : null}
          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3">
            {canChoose ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onChoose("accepted")}
                  className="h-auto min-h-11 w-full rounded-[10px] px-3 py-2 text-[0.9375rem] font-semibold whitespace-normal"
                >
                  {copy.accept}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onChoose("declined")}
                  className="h-auto min-h-11 w-full rounded-[10px] px-3 py-2 text-[0.9375rem] font-semibold whitespace-normal"
                >
                  {copy.decline}
                </Button>
              </>
            ) : null}
            {isOpen ? (
              <Button
                type="button"
                variant="ghost"
                onClick={closePanel}
                className="col-span-2 h-auto min-h-11 w-full rounded-[10px] px-3 py-2 text-[0.9375rem] font-semibold"
              >
                {copy.close}
              </Button>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}

/** Reopens the notice from the footer. It needs JavaScript, as does the analytics it controls. */
export function CookiePreferencesControl() {
  const state = useSyncExternalStore(subscribe, getState, getPending);
  if (!gaId || state === "pending") return null;

  return (
    <li>
      <button
        id={CONTROL_ID}
        type="button"
        onClick={() => setPanelOpen(true)}
        className="cursor-pointer rounded-sm transition-colors hover:text-foreground"
      >
        {ANALYTICS_CONSENT.footerLabel}
      </button>
    </li>
  );
}
