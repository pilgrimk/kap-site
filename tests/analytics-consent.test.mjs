// Run with `npm test` (Node's built-in test runner; Node strips the TypeScript types).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  analyticsState,
  googleAnalyticsCookieRemovals,
  isGoogleAnalyticsCookie,
  parseAnalyticsPreference,
} from "../lib/analytics-consent.ts";

describe("analytics preference", () => {
  it("accepts only the exact stored values", () => {
    assert.equal(parseAnalyticsPreference("accepted"), "accepted");
    assert.equal(parseAnalyticsPreference("declined"), "declined");
    for (const raw of [null, undefined, "", "true", "ACCEPTED", "accepted ", '{"accepted":true}']) {
      assert.equal(parseAnalyticsPreference(raw), null, String(raw));
    }
  });
});

describe("analytics state", () => {
  const state = (preference, gpc = false, storageAvailable = true) =>
    analyticsState({ preference, gpc, storageAvailable });

  it("has no decision until the visitor makes one", () => {
    assert.equal(state(null), "undecided");
    assert.equal(state("declined"), "declined");
    assert.equal(state("accepted"), "accepted");
  });

  it("lets Global Privacy Control outrank an earlier acceptance", () => {
    assert.equal(state("accepted", true), "gpc");
    assert.equal(state(null, true), "gpc");
    assert.equal(state("declined", true), "gpc");
    assert.equal(state(null, true, false), "gpc");
  });

  it("fails closed without storage", () => {
    assert.equal(state(null, false, false), "unavailable");
    assert.equal(state("accepted", false, false), "unavailable");
  });
});

describe("Google Analytics cookies", () => {
  it("recognises only GA's own names", () => {
    for (const name of ["_ga", "_ga_ABC123", "_ga_X"]) assert.equal(isGoogleAnalyticsCookie(name), true, name);
    for (const name of ["__stripe_mid", "__stripe_sid", "m", "_gallery", "ga", "_ga_", "x_ga"]) {
      assert.equal(isGoogleAnalyticsCookie(name), false, name);
    }
  });

  it("expires GA cookies on the host and each parent domain, leaving others alone", () => {
    const removals = googleAnalyticsCookieRemovals(
      "_ga=GA1.1.1; __stripe_mid=abc; _ga_X=GS1; other=1",
      "www.kap-enterprises-llc.com",
    );
    assert.deepEqual(removals, [
      "_ga=; Max-Age=0; path=/",
      "_ga=; Max-Age=0; path=/; domain=.www.kap-enterprises-llc.com",
      "_ga=; Max-Age=0; path=/; domain=.kap-enterprises-llc.com",
      "_ga_X=; Max-Age=0; path=/",
      "_ga_X=; Max-Age=0; path=/; domain=.www.kap-enterprises-llc.com",
      "_ga_X=; Max-Age=0; path=/; domain=.kap-enterprises-llc.com",
    ]);
    assert.equal(removals.some((r) => r.includes("stripe") || r.startsWith("other")), false);
  });

  it("uses no domain attribute on localhost or an IP address", () => {
    assert.deepEqual(googleAnalyticsCookieRemovals("_ga=1", "localhost"), ["_ga=; Max-Age=0; path=/"]);
    assert.deepEqual(googleAnalyticsCookieRemovals("_ga=1", "127.0.0.1"), ["_ga=; Max-Age=0; path=/"]);
  });

  it("does nothing when there is nothing to remove", () => {
    assert.deepEqual(googleAnalyticsCookieRemovals("", "localhost"), []);
    assert.deepEqual(googleAnalyticsCookieRemovals("__stripe_mid=abc", "localhost"), []);
  });
});
