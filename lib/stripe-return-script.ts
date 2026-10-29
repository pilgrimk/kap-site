import { STRIPE_RETURN_STORAGE_KEY } from "@/lib/validation";

/**
 * Inline script for the payment page. It runs while the HTML is parsed, before
 * hydration and before Google Analytics is injected, so Stripe's return
 * parameters (including the PaymentIntent client secret) are removed from the
 * address bar before any analytics code can read the URL. The values are kept
 * for PaymentForm, which asks Stripe for the real payment status.
 */
export const STRIPE_RETURN_SCRIPT = `(function () {
  try {
    var params = new URLSearchParams(window.location.search);
    var keys = ["payment_intent", "payment_intent_client_secret", "redirect_status"];
    if (!keys.some(function (key) { return params.has(key); })) return;
    var secret = params.get("payment_intent_client_secret");
    if (secret) {
      var record = JSON.stringify({
        clientSecret: secret,
        paymentIntentId: params.get("payment_intent"),
        savedAt: Date.now()
      });
      window.__kapStripeReturn = record;
      try { window.sessionStorage.setItem(${JSON.stringify(STRIPE_RETURN_STORAGE_KEY)}, record); } catch (e) {}
    }
    keys.forEach(function (key) { params.delete(key); });
    var rest = params.toString();
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + (rest ? "?" + rest : "") + window.location.hash
    );
  } catch (e) {}
})();`;
