export const SITE_NAME = "KAP Enterprises";
export const SITE_TAGLINE = "AI Automation for SMBs";
export const SITE_DESCRIPTION =
  "Custom-built AI automation systems for SMBs that streamline operations, reduce manual work, and help your business grow faster.";
export const SITE_URL = "https://www.kap-enterprises-llc.com";

export const CONTACT_EMAIL = "sales@kap-enterprises-llc.com";
export const MAILING_ADDRESS = "PO Box 3573, Scottsdale, AZ 85271";

// Footer navigation. The header shows Home, the Services menu, About and Contact Us, then the
// contact CTA (the link is ordinary navigation; the CTA is the conversion action).
export const NAV_LINKS = [
  { label: "Services", href: "/#solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const HOME_LINK = { label: "Home", href: "/" } as const;
export const ABOUT_LINK = NAV_LINKS[1];
export const CONTACT_NAV_LINK = { label: "Contact Us", href: "/contact" } as const;

// Approved primary CTA label (brief A6); the header uses the compact form.
export const PRIMARY_CTA = {
  label: "Let's Talk About Your Business",
  shortLabel: "Let's Talk",
  href: "/contact",
} as const;

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;

export const PAYMENT_LINK = {
  label: "Make Payment",
  href: "/payment",
} as const;

export const SEO_KEYWORDS = [
  "AI automation",
  "business automation",
  "AI for small business",
  "n8n automation",
  "CRM automation",
  "email automation",
  "SMB operational efficiency",
];
