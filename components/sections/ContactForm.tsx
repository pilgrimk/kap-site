"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/constants";
import { GOAL_OPTIONS } from "@/lib/content";
import { cn } from "@/lib/utils";
import {
  CONTACT_LIMITS,
  MAX_EMAIL_LENGTH,
  contactFieldErrors,
  type ContactField,
} from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<ContactField, string>>;

const FIELD_ORDER: ContactField[] = ["name", "email", "company", "message"];

const inputClasses =
  "block w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors placeholder:text-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:opacity-60 aria-invalid:border-destructive";

function errorId(field: ContactField) {
  return `${field}-error`;
}

/** aria-invalid / aria-describedby for a field, only while it has an error. */
function errorProps(errors: FieldErrors, field: ContactField) {
  return errors[field]
    ? { "aria-invalid": true, "aria-describedby": errorId(field) }
    : {};
}

function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: ContactField | "goal";
  required?: boolean;
  hint?: string;
  error?: string;
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
      {error && htmlFor !== "goal" ? (
        <p id={errorId(htmlFor)} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const pendingFocusRef = useRef<ContactField | null>(null);

  // Announce the confirmation: the form it replaces held keyboard focus.
  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  // Focus the first invalid field once it has re-rendered (and is no longer
  // disabled from submitting), so its error is read out with it.
  useEffect(() => {
    const field = pendingFocusRef.current;
    if (!field || status === "submitting") return;
    pendingFocusRef.current = null;
    const element = formRef.current?.elements.namedItem(field);
    if (element instanceof HTMLElement) element.focus();
  }, [fieldErrors, status]);

  function showFieldErrors(errors: FieldErrors) {
    pendingFocusRef.current = FIELD_ORDER.find((field) => errors[field]) ?? null;
    setFieldErrors(errors);
  }

  function clearFieldError(field: ContactField) {
    if (!fieldErrors[field]) return;
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

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

    const errors = contactFieldErrors(payload);
    if (Object.keys(errors).length > 0) {
      setError(null);
      showFieldErrors(errors);
      return;
    }

    setStatus("submitting");
    setError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 429) {
        throw new Error(
          `Too many messages have been sent from your connection. Please wait a minute and try again, or email ${CONTACT_EMAIL} directly.`,
        );
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (
          typeof body.field === "string" &&
          FIELD_ORDER.includes(body.field as ContactField) &&
          typeof body.error === "string"
        ) {
          setStatus("idle");
          showFieldErrors({ [body.field as ContactField]: body.error });
          return;
        }
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
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-5 scroll-mt-32 text-2xl font-semibold tracking-tight text-foreground focus:outline-none"
        >
          Message received.
        </h2>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          We&apos;ll review what you sent and get back to you within one business
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
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl bg-card p-8 ring-1 ring-foreground/8"
    >
      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Name" htmlFor="name" required error={fieldErrors.name}>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={CONTACT_LIMITS.name}
              autoComplete="name"
              disabled={submitting}
              className={inputClasses}
              placeholder="Kevin Pilgrim"
              onInput={() => clearFieldError("name")}
              {...errorProps(fieldErrors, "name")}
            />
          </Field>
          <Field
            label="Email"
            htmlFor="email"
            required
            error={fieldErrors.email}
          >
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={MAX_EMAIL_LENGTH}
              autoComplete="email"
              disabled={submitting}
              className={inputClasses}
              placeholder="you@company.com"
              onInput={() => clearFieldError("email")}
              {...errorProps(fieldErrors, "email")}
            />
          </Field>
        </div>

        <Field
          label="Company"
          htmlFor="company"
          hint="Optional"
          error={fieldErrors.company}
        >
          <input
            id="company"
            name="company"
            type="text"
            maxLength={CONTACT_LIMITS.company}
            autoComplete="organization"
            disabled={submitting}
            className={inputClasses}
            placeholder="Acme Inc."
            onInput={() => clearFieldError("company")}
            {...errorProps(fieldErrors, "company")}
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

        <Field
          label="Message"
          htmlFor="message"
          required
          error={fieldErrors.message}
        >
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={CONTACT_LIMITS.message}
            disabled={submitting}
            className={cn(inputClasses, "resize-y")}
            placeholder="Tell us about the busywork, the tools you use, and what success looks like."
            onInput={() => clearFieldError("message")}
            {...errorProps(fieldErrors, "message")}
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
            We&apos;ll reply within one business day.
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
