// Rules for the Google Analytics consent choice, kept free of imports and of the browser so
// `node --test` can load them directly (see tests/). The UI is components/shared/AnalyticsConsent.tsx.

/** localStorage key. It holds only the word "accepted" or "declined". */
export const ANALYTICS_CONSENT_KEY = "kap.analytics-consent.v1";

export type AnalyticsPreference = "accepted" | "declined";

/** What applies to this visitor. Analytics runs only in "accepted". */
export type AnalyticsState = "undecided" | AnalyticsPreference | "gpc" | "unavailable";

/** Anything other than an exact, known value counts as no decision. */
export function parseAnalyticsPreference(raw: string | null | undefined): AnalyticsPreference | null {
  return raw === "accepted" || raw === "declined" ? raw : null;
}

/**
 * A Global Privacy Control signal outranks everything, including an earlier "accepted". Without
 * working storage a choice cannot be remembered, so analytics stays off.
 */
export function analyticsState(input: {
  preference: AnalyticsPreference | null;
  gpc: boolean;
  storageAvailable: boolean;
}): AnalyticsState {
  if (input.gpc) return "gpc";
  if (!input.storageAvailable) return "unavailable";
  return input.preference ?? "undecided";
}

/** Google Analytics 4's own first-party cookies: `_ga` and `_ga_<container>`, nothing else. */
export function isGoogleAnalyticsCookie(name: string): boolean {
  return /^_ga(_.+)?$/.test(name);
}

/**
 * Assignments that expire every Google Analytics cookie in `cookieHeader`. A cookie can only be
 * removed with the domain it was set on, and GA picks the highest domain it can, so each candidate
 * is tried: the host itself, then every parent domain except the bare top-level one.
 */
export function googleAnalyticsCookieRemovals(cookieHeader: string, hostname: string): string[] {
  const names = cookieHeader
    .split(";")
    .map((part) => part.split("=")[0].trim())
    .filter(isGoogleAnalyticsCookie);

  const labels = hostname.split(".");
  const isNamedHost = labels.length > 1 && !/^[\d.]+$/.test(hostname);
  const domains = isNamedHost
    ? labels.slice(0, -1).map((_, i) => `.${labels.slice(i).join(".")}`)
    : [];

  const expire = "=; Max-Age=0; path=/";
  return names.flatMap((name) => [
    `${name}${expire}`,
    ...domains.map((domain) => `${name}${expire}; domain=${domain}`),
  ]);
}
