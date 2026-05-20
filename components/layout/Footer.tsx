import Link from "next/link";
import Image from "next/image";
import {
  CONTACT_EMAIL,
  MAILING_ADDRESS,
  NAV_LINKS,
  PAYMENT_LINK,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label={`${SITE_NAME} home`}
            >
              <Image
                src="/logo.png"
                alt={SITE_NAME}
                width={160}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {SITE_TAGLINE}. Custom automation systems for SMBs — built by an
              engineer with 30+ years of shipping production software.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={PAYMENT_LINK.href}
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  {PAYMENT_LINK.label}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="text-muted-foreground">{MAILING_ADDRESS}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p>Built by an engineer, not a marketer.</p>
        </div>
      </div>
    </footer>
  );
}
