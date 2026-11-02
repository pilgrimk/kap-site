"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ABOUT_LINK, CONTACT_NAV_LINK, HOME_LINK, PRIMARY_CTA, SITE_NAME } from "@/lib/constants";
import { SERVICES_NAV } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ServiceNavIcon, ServicesMenu, navLinkClasses } from "./ServicesMenu";

const mobileLinkClasses =
  "flex min-h-11 items-center rounded-md px-2 py-2 text-[0.9375rem] font-medium text-foreground/80 hover:bg-muted hover:text-foreground aria-[current=page]:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const servicesId = useId();
  const current = (href: string) => (href === pathname ? "page" : undefined);

  // Escape closes the mobile menu and returns focus to its toggle.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={`${SITE_NAME} home`}
        >
          <Image
            src="/logo.png"
            alt=""
            width={160}
            height={48}
            priority
            className="h-8 w-auto md:h-10"
          />
          {/* Short name on phones and between md and lg, where the desktop links need the room */}
          <span className="font-semibold tracking-tight whitespace-nowrap text-foreground">
            <span className="text-base sm:hidden md:inline md:text-lg lg:hidden">KAP</span>
            <span className="hidden text-base sm:inline md:hidden lg:inline lg:text-lg">
              KAP Enterprises
            </span>
          </span>
        </Link>

        {/* Tighter below lg: four links plus the CTA must fit at 768px with enlarged text */}
        <nav aria-label="Main" className="hidden items-center gap-5 md:flex lg:gap-8">
          <Link href={HOME_LINK.href} aria-current={current(HOME_LINK.href)} className={navLinkClasses}>
            {HOME_LINK.label}
          </Link>
          <ServicesMenu pathname={pathname} />
          <Link href={ABOUT_LINK.href} aria-current={current(ABOUT_LINK.href)} className={navLinkClasses}>
            {ABOUT_LINK.label}
          </Link>
          <Link href={CONTACT_NAV_LINK.href} aria-current={current(CONTACT_NAV_LINK.href)} className={navLinkClasses}>
            {CONTACT_NAV_LINK.label}
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="coral" size="sm" className="h-10 rounded-[10px] px-4 text-sm">
            <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.shortLabel}</Link>
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          // Scrolls inside itself, so a long menu (enlarged text) never runs past the sticky header's reach.
          "max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border/60 bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav aria-label="Main" className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
          <Link
            href={HOME_LINK.href}
            aria-current={current(HOME_LINK.href)}
            onClick={() => setOpen(false)}
            className={mobileLinkClasses}
          >
            {HOME_LINK.label}
          </Link>

          <button
            type="button"
            aria-expanded={servicesOpen}
            aria-controls={servicesId}
            onClick={() => setServicesOpen((v) => !v)}
            className={cn(mobileLinkClasses, "w-full justify-between text-left")}
          >
            {SERVICES_NAV.label}
            <ChevronDown aria-hidden className={cn("size-4", servicesOpen && "rotate-180")} />
          </button>
          <ul id={servicesId} hidden={!servicesOpen} className="mb-1 ml-2 border-l border-rule pl-3">
            {SERVICES_NAV.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current(item.href)}
                  onClick={() => setOpen(false)}
                  className={cn(mobileLinkClasses, "gap-3 py-2.5 font-semibold text-foreground")}
                >
                  <ServiceNavIcon item={item} current={item.href === pathname} className="size-8" />
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={SERVICES_NAV.all.href}
                onClick={() => setOpen(false)}
                className={cn(mobileLinkClasses, "gap-2")}
              >
                {SERVICES_NAV.all.label}
                <ArrowRight aria-hidden className="size-4 text-coral-ink" />
              </Link>
            </li>
          </ul>

          <Link
            href={ABOUT_LINK.href}
            aria-current={current(ABOUT_LINK.href)}
            onClick={() => setOpen(false)}
            className={mobileLinkClasses}
          >
            {ABOUT_LINK.label}
          </Link>
          <Link
            href={CONTACT_NAV_LINK.href}
            aria-current={current(CONTACT_NAV_LINK.href)}
            onClick={() => setOpen(false)}
            className={mobileLinkClasses}
          >
            {CONTACT_NAV_LINK.label}
          </Link>
          <Button
            asChild
            variant="coral"
            size="sm"
            className="mt-2 h-auto min-h-11 rounded-[10px] px-4 py-2.5 text-center text-sm whitespace-normal"
          >
            <Link href={PRIMARY_CTA.href} onClick={() => setOpen(false)}>
              {PRIMARY_CTA.label}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
