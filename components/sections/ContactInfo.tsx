import { Clock, Mail, MapPin } from "lucide-react";
import { CONTACT_EMAIL, MAILING_ADDRESS } from "@/lib/constants";

const ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: (
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="text-foreground hover:underline"
      >
        {CONTACT_EMAIL}
      </a>
    ),
  },
  {
    icon: MapPin,
    label: "Mail",
    value: MAILING_ADDRESS,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within one business day",
  },
];

export function ContactInfo() {
  return (
    <aside className="rounded-2xl bg-card p-8 ring-1 ring-foreground/8">
      <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/60">
        Direct
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
          What helps us help you
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>The repetitive task eating your time.</li>
          <li>The tools you currently use.</li>
          <li>What success looks like in 90 days.</li>
        </ul>
      </div>
    </aside>
  );
}
