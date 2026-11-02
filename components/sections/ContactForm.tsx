"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { ChevronDown, CircleAlert, CircleCheck, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/constants";
import { CONTACT_PAGE, GOAL_OPTIONS } from "@/lib/content";
import { cn } from "@/lib/utils";
import o from "@/components/shared/optimism.module.css";
import {
  CONTACT_LIMITS,
  MAX_EMAIL_LENGTH,
  contactFieldErrors,
  type ContactField,
} from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<ContactField, string>>;

const copy = CONTACT_PAGE.form;

const FIELD_ORDER: ContactField[] = ["name", "email", "company", "message"];

// 16px text keeps mobile browsers from zooming into the field on focus.
const inputClasses =
  "block w-full min-w-0 rounded-[10px] border border-rule bg-white px-4 text-base text-foreground transition-[border-color,box-shadow] duration-150 placeholder:text-ink-soft/70 focus:border-brand-magenta focus:outline-none focus:ring-3 focus:ring-brand-magenta/20 disabled:opacity-60 aria-invalid:border-destructive aria-invalid:focus:ring-destructive/20";

const linkClasses =
  "rounded-sm font-semibold wrap-anywhere underline decoration-foreground/40 underline-offset-4 transition-colors duration-150 hover:decoration-coral-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

/** aria-invalid / aria-describedby for a field: its help text, and its error while it has one. */
function describe(errors: FieldErrors, field: ContactField, hasHelp = false) {
  const invalid = Boolean(errors[field]);
  const ids = [hasHelp ? `${field}-help` : null, invalid ? `${field}-error` : null].filter(Boolean);
  return {
    "aria-invalid": invalid || undefined,
    "aria-describedby": ids.length ? ids.join(" ") : undefined,
  };
}

function Field({
  label,
  htmlFor,
  optional,
  help,
  error,
  children,
}: {
  label: string;
  htmlFor: ContactField | "goal";
  optional?: boolean;
  help?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={htmlFor}
        className="flex flex-wrap items-baseline justify-between gap-x-3 text-[0.9375rem] font-semibold text-foreground"
      >
        {label}
        {optional ? <span className="text-sm font-normal text-ink-soft">{copy.optional}</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {help ? (
        <p id={`${htmlFor}-help`} className="mt-2 text-sm text-ink-soft">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-destructive">
          <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** The white card the form and its confirmation sit in, with the logo-gradient edge. */
function Panel({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative min-w-0 overflow-hidden rounded-[20px] border border-rule bg-paper p-5 shadow-[0_24px_48px_-32px_rgb(26_26_26/0.35)] sm:p-8 md:p-10",
        o.accentEdge,
      )}
    >
      {children}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const pendingFocusRef = useRef<ContactField | null>(null);

  // Announce the confirmation: the form it replaces held keyboard focus.
  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  // Disabling the button while sending drops keyboard focus to the page; give it back on failure.
  useEffect(() => {
    if (status === "error") submitRef.current?.focus();
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
      // fetch rejects with a TypeError ("Failed to fetch") when the request never reached the server.
      setError(
        err instanceof TypeError
          ? `${copy.networkError} ${CONTACT_EMAIL}.`
          : err instanceof Error
            ? err.message
            : "Something went wrong.",
      );
    }
  }

  if (status === "success") {
    return (
      <Panel>
        <span
          aria-hidden
          className="flex size-11 items-center justify-center rounded-full bg-brand-magenta/10 text-brand-magenta"
        >
          <CircleCheck className="size-5.5" />
        </span>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-6 scroll-mt-32 font-display text-[1.75rem] font-bold leading-tight tracking-[-0.015em] focus:outline-none"
        >
          {copy.success.title}
        </h2>
        <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-soft">
          {copy.success.body}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={cn(linkClasses, "text-foreground")}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setError(null);
          }}
          className="mt-8 rounded-sm border-b border-foreground/40 pb-0.5 text-[0.9375rem] font-semibold transition-colors duration-150 hover:border-coral-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          {copy.success.again}
        </button>
      </Panel>
    );
  }

  const submitting = status === "submitting";

  return (
    <Panel>
      <h2
        id="contact-form-title"
        className="scroll-mt-32 font-display text-[1.6rem] font-bold leading-tight tracking-[-0.015em]"
      >
        {copy.title}
      </h2>
      <p className="mt-2 text-[0.95rem] text-ink-soft">{copy.intro}</p>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        aria-labelledby="contact-form-title"
        className="mt-8 grid gap-6"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label={copy.labels.name} htmlFor="name" error={fieldErrors.name}>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={CONTACT_LIMITS.name}
              autoComplete="name"
              disabled={submitting}
              className={cn(inputClasses, "h-12")}
              onInput={() => clearFieldError("name")}
              {...describe(fieldErrors, "name")}
            />
          </Field>
          <Field label={copy.labels.email} htmlFor="email" help={copy.help.email} error={fieldErrors.email}>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={MAX_EMAIL_LENGTH}
              autoComplete="email"
              disabled={submitting}
              className={cn(inputClasses, "h-12")}
              onInput={() => clearFieldError("email")}
              {...describe(fieldErrors, "email", true)}
            />
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label={copy.labels.company} htmlFor="company" optional error={fieldErrors.company}>
            <input
              id="company"
              name="company"
              type="text"
              maxLength={CONTACT_LIMITS.company}
              autoComplete="organization"
              disabled={submitting}
              className={cn(inputClasses, "h-12")}
              onInput={() => clearFieldError("company")}
              {...describe(fieldErrors, "company")}
            />
          </Field>

          <Field label={copy.labels.goal} htmlFor="goal" optional>
            <div className="relative">
              <select
                id="goal"
                name="goal"
                defaultValue=""
                disabled={submitting}
                className={cn(inputClasses, "h-12 appearance-none pr-11")}
              >
                <option value="" disabled>
                  {copy.goalPlaceholder}
                </option>
                {GOAL_OPTIONS.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-soft"
              />
            </div>
          </Field>
        </div>

        <Field label={copy.labels.message} htmlFor="message" help={copy.help.message} error={fieldErrors.message}>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={CONTACT_LIMITS.message}
            disabled={submitting}
            className={cn(inputClasses, "min-h-40 resize-y py-3 leading-relaxed")}
            onInput={() => clearFieldError("message")}
            {...describe(fieldErrors, "message", true)}
          />
        </Field>

        {/* Honeypot — bots fill anything, humans never see this */}
        <div className="hidden" aria-hidden>
          <label htmlFor="hp">Leave this field blank</label>
          <input id="hp" name="hp" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {error ? (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-[10px] border border-destructive/35 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive"
          >
            <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
            <p className="min-w-0 wrap-anywhere">{error}</p>
          </div>
        ) : null}

        <div className="pt-1">
          <Button
            ref={submitRef}
            type="submit"
            variant="coral"
            disabled={submitting}
            className="h-auto min-h-13.5 w-full rounded-[10px] px-6.5 py-3 text-base whitespace-normal sm:w-auto"
          >
            {submitting ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin motion-reduce:animate-none" />
                <span>{copy.submitting}</span>
              </>
            ) : (
              <>
                <span>{copy.submit}</span>
                <Send aria-hidden className="size-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Panel>
  );
}
