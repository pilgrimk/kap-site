import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/constants";
import { GOAL_OPTIONS } from "@/lib/content";
import {
  isCrossSiteRequest,
  readJsonBody,
  validateContactSubmission,
} from "@/lib/validation";

// Message is capped at 5,000 characters; 32 KB covers that in any encoding.
const MAX_BODY_BYTES = 32 * 1024;

const ALLOWED_GOALS = GOAL_OPTIONS.map((option) => option.label);

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  if (isCrossSiteRequest(request)) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 403 });
  }

  const parsed = await readJsonBody(request, MAX_BODY_BYTES);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: parsed.status },
    );
  }
  const body = parsed.body;

  // Honeypot — silently accept to avoid signaling bots
  if (typeof body.hp === "string" && body.hp.trim()) {
    return NextResponse.json({ ok: true });
  }

  const result = validateContactSubmission(body, ALLOWED_GOALS);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, field: result.field },
      { status: 400 },
    );
  }
  // Single-line fields are already free of line breaks and control characters,
  // so the subject line cannot be split.
  const { name, email, company, goal, message } = result.value;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "onboarding@resend.dev";
  const to = process.env.RESEND_TO || CONTACT_EMAIL;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      {
        error: `Email service is not configured. Please email ${CONTACT_EMAIL} directly.`,
      },
      { status: 503 },
    );
  }

  const subject = `New inquiry from ${name}${company ? ` (${company})` : ""}`;
  const text = [
    `From: ${name} <${email}>`,
    company ? `Company: ${company}` : null,
    goal ? `Goal: ${goal}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>New inquiry from KAP Enterprises website</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
    ${goal ? `<p><strong>Goal:</strong> ${escapeHtml(goal)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `.trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `KAP Website <${from}>`,
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      // Truncated: the body is for diagnosis and should never carry message content.
      const errorBody = (await res.text()).slice(0, 300);
      console.error("Resend error:", res.status, errorBody);
      return NextResponse.json(
        {
          error: `We couldn't send your message. Please email ${CONTACT_EMAIL} directly.`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", (err as Error)?.name);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
