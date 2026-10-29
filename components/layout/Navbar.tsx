"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, PRIMARY_CTA, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

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
          <span className="font-semibold tracking-tight whitespace-nowrap text-foreground">
            <span className="text-base sm:hidden">KAP</span>
            <span className="hidden text-base sm:inline md:text-lg">
              KAP Enterprises
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="coral" size="sm" className="h-10 rounded-[10px] px-4 text-sm">
            <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.shortLabel}</Link>
          </Button>
        </div>

        <button
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
          "border-t border-border/60 bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="coral" size="sm" className="mt-2 h-11 rounded-[10px] px-4 text-sm">
            <Link href={PRIMARY_CTA.href} onClick={() => setOpen(false)}>
              {PRIMARY_CTA.label}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
