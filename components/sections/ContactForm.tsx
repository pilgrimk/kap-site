"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/constants";
import { GOAL_OPTIONS } from "@/lib/content";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "block w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:opacity-60";

function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="flex items-center justify-between text-sm font-medium text-foreground"
      >
        <span>
          {label}
          {required ? (
            <span className="ml-1 text-primary" aria-hidden>
              *
            </span>
          ) : null}
        </span>
        {hint ? (
          <span className="text-xs font-normal text-muted-foreground">
            {hint}
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      goal: data.get("goal"),
      message: data.get("message"),
      hp: data.get("hp"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-card p-10 ring-1 ring-foreground/8">
        <div className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
          <span aria-hidden className="text-lg">
            ✓
          </span>
        </div>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
          Message received.
        </h2>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          We'll review what you sent and get back to you within one business
          day. If something is urgent, you can also email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-foreground underline"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          directly.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setError(null);
          }}
          className="mt-6 text-xs font-medium text-primary underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl bg-card p-8 ring-1 ring-foreground/8"
    >
      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Name" htmlFor="name" required>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              disabled={submitting}
              className={inputClasses}
              placeholder="Kevin Pilgrim"
            />
          </Field>
          <Field label="Email" htmlFor="email" required>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={submitting}
              className={inputClasses}
              placeholder="you@company.com"
            />
          </Field>
        </div>

        <Field label="Company" htmlFor="company" hint="Optional">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            disabled={submitting}
            className={inputClasses}
            placeholder="Acme Inc."
          />
        </Field>

        <Field label="What do you want to automate?" htmlFor="goal" hint="Optional">
          <div className="relative">
            <select
              id="goal"
              name="goal"
              defaultValue=""
              disabled={submitting}
              className={cn(inputClasses, "appearance-none pr-10")}
            >
              <option value="" disabled>
                Select an area…
              </option>
              {GOAL_OPTIONS.map((o) => (
                <option key={o.value} value={o.label}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
          </div>
        </Field>

        <Field label="Message" htmlFor="message" required>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            disabled={submitting}
            className={cn(inputClasses, "resize-y")}
            placeholder="Tell us about the busywork, the tools you use, and what success looks like."
          />
        </Field>

        {/* Honeypot — bots fill anything, humans never see this */}
        <div className="hidden" aria-hidden>
          <label htmlFor="hp">Leave this field blank</label>
          <input
            id="hp"
            name="hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {error ? (
          <div
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </div>
        ) : null}

        <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            We'll reply within one business day.
          </p>
          <Button
            type="submit"
            disabled={submitting}
            className="h-11 px-6 text-sm font-semibold"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                <span>Sending…</span>
              </>
            ) : (
              <span>Send message</span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
