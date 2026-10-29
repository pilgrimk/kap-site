export const SITE_NAME = "KAP Enterprises";
export const SITE_TAGLINE = "AI Automation for SMBs";
export const SITE_DESCRIPTION =
  "Custom-built AI automation systems for SMBs that streamline operations, reduce manual work, and help your business grow faster.";
export const SITE_URL = "https://kap-enterprises-llc.com";

export const CONTACT_EMAIL = "sales@kap-enterprises-llc.com";
export const MAILING_ADDRESS = "PO Box 3573, Scottsdale, AZ 85271";

export const NAV_LINKS = [
  { label: "Solutions", href: "/#solutions" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Approved primary CTA label (brief A6); the header uses the compact form.
export const PRIMARY_CTA = {
  label: "Let's Talk About Your Business",
  shortLabel: "Let's Talk",
  href: "/contact",
} as const;

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
