import { CreditCard, Receipt, ShieldCheck } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";

const ITEMS = [
  {
    icon: CreditCard,
    label: "Accepted",
    value: "Visa, Mastercard, Amex, Discover, and other major cards.",
  },
  {
    icon: ShieldCheck,
    label: "Security",
    value:
      "Stripe processes the payment. Your card details never reach our servers.",
  },
  {
    icon: Receipt,
    label: "Receipt",
    value: "Stripe emails you a receipt as soon as the payment confirms.",
  },
];

export function PaymentInfo() {
  return (
    <aside className="rounded-2xl bg-card p-8 ring-1 ring-foreground/8">
      <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/60">
        Secure checkout
      </h2>
      <dl className="mt-6 space-y-7">
        {ITEMS.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-4">
            <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary ring-1 ring-primary/15">
              <Icon className="size-4" strokeWidth={1.75} />
            </div>
            <div className="text-sm">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/55">
                {label}
              </dt>
              <dd className="mt-1.5 text-foreground/85">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-10 border-t border-border/60 pt-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/55">
          Need help?
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Questions about your invoice or charge? Email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-foreground underline"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          and we'll sort it out.
        </p>
      </div>
    </aside>
  );
}
