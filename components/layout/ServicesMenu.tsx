"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Globe, MessagesSquare, Workflow, type LucideIcon } from "lucide-react";
import { SERVICES_NAV } from "@/lib/content";
import { cn } from "@/lib/utils";

type ServiceNavItem = (typeof SERVICES_NAV.items)[number];

export const serviceNavIcons: Partial<Record<ServiceNavItem["icon"], LucideIcon>> = {
  Workflow,
  MessagesSquare,
  Globe,
};

export const navLinkClasses =
  "rounded-sm text-sm font-medium whitespace-nowrap text-foreground/75 transition-colors duration-150 hover:text-foreground aria-[current=page]:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

/** Icon tile for a service: magenta when that service's page is open. */
export function ServiceNavIcon({ item, current, className }: { item: ServiceNavItem; current: boolean; className?: string }) {
  const Icon = serviceNavIcons[item.icon];
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[10px] transition-colors duration-150",
        current ? "bg-brand-magenta text-brand-cream" : "bg-deep-cream text-coral-ink",
        className,
      )}
    >
      {Icon ? <Icon className="size-4.5" /> : null}
    </span>
  );
}

/**
 * Desktop Services menu: a disclosure (button + panel of links), opened by click, tap, Enter or
 * Space, never by hover alone. Escape, an outside click or tabbing out closes it; the arrow keys
 * move between its links.
 */
export function ServicesMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const inServices = SERVICES_NAV.items.some((item) => item.href === pathname);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      if (rootRef.current?.contains(document.activeElement)) buttonRef.current?.focus();
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function links() {
    return Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
  }

  function focusLink(index: number) {
    const all = links();
    all[(index + all.length) % all.length]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    // From the button, Down/Up open the menu on its first/last link.
    if (event.target === buttonRef.current && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      event.preventDefault();
      const target = event.key === "ArrowDown" ? 0 : -1;
      setOpen(true);
      requestAnimationFrame(() => focusLink(target));
      return;
    }
    const at = links().indexOf(document.activeElement as HTMLAnchorElement);
    if (at === -1) return;
    const next = ({ ArrowDown: at + 1, ArrowUp: at - 1, Home: 0, End: -1 } as Record<string, number>)[event.key];
    if (next === undefined) return;
    event.preventDefault();
    focusLink(next);
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onKeyDown={onKeyDown}
      onBlur={(event) => {
        // Tabbing out closes it; a click elsewhere is handled by the pointer listener.
        const next = event.relatedTarget as Node | null;
        if (next && !rootRef.current?.contains(next)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          navLinkClasses,
          "inline-flex items-center gap-1 py-1",
          (open || inServices) && "text-foreground",
        )}
      >
        {SERVICES_NAV.label}
        <ChevronDown
          aria-hidden
          className={cn(
            "size-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        className={cn(
          "absolute top-full left-1/2 mt-4 w-[min(25.5rem,calc(100vw-3rem))] origin-top -translate-x-1/2",
          "rounded-[16px] border border-rule bg-paper p-2 shadow-[0_24px_48px_-24px_rgb(26_26_26/0.4),0_2px_6px_rgb(26_26_26/0.05)]",
          "duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
          // Visibility flips at once on open, so its links can take focus straight away, and is
          // held until the fade ends on close.
          open
            ? "visible opacity-100 transition-[opacity,scale,translate]"
            : "invisible -translate-y-1 scale-[0.97] opacity-0 transition-[opacity,scale,translate,visibility]",
        )}
      >
        <ul>
          {SERVICES_NAV.items.map((item) => {
            const current = item.href === pathname;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="group flex gap-3.5 rounded-[10px] p-3 transition-colors duration-150 hover:bg-deep-cream/55 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground"
                >
                  <ServiceNavIcon item={item} current={current} className="size-10" />
                  <span className="min-w-0">
                    <span className="block font-semibold leading-snug text-foreground">{item.title}</span>
                    <span className="mt-0.5 block text-[0.875rem] leading-snug text-ink-soft">
                      {item.description}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-1 border-t border-rule pt-1">
          <Link
            href={SERVICES_NAV.all.href}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 text-sm font-semibold text-foreground transition-colors duration-150 hover:bg-deep-cream/55 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground"
          >
            {SERVICES_NAV.all.label}
            <ArrowRight aria-hidden className="size-4 text-coral-ink" />
          </Link>
        </div>
      </div>
    </div>
  );
}
