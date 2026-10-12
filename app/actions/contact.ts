"use server";

import { headers } from "next/headers";
import { contactSchema, type ContactInput } from "@/lib/validation";
import type { ContactState } from "@/lib/contact-state";
import { rateLimit } from "@/lib/rate-limit";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Contact form handler.
 *
 * Env vars (see README):
 *  - RESEND_API_KEY      Resend API key. If missing, submissions are logged
 *                        in development and rejected with a friendly message in production.
 *  - CONTACT_TO_EMAIL    Inbox that receives enquiries.            [TBD]
 *  - CONTACT_FROM_EMAIL  Verified sender, e.g. "xDEVS <noreply@xdevs.in>". [TBD]
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    service: String(formData.get("service") ?? ""),
    details: String(formData.get("details") ?? ""),
  };

  // Honeypot: real users never fill this hidden field.
  if (String(formData.get("company_website") ?? "").length > 0) {
    return { status: "success", message: "Thanks. We will be in touch soon." };
  }

  // Time trap: reject forms submitted faster than a human could type.
  const started = Number(formData.get("t") ?? 0);
  if (started && Date.now() - started < 2500) {
    return { status: "error", message: "That was quick. Please try again.", values: raw };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!rateLimit(`contact:${ip}`).ok) {
    return {
      status: "error",
      message: "Too many requests. Please wait a few minutes and try again.",
      values: raw,
    };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values: raw };
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Email provider not configured. Submission:", data);
      return { status: "success", message: "Thanks. (Dev mode: logged to the server console.)" };
    }
    console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL not set.");
    return {
      status: "error",
      message: "Our form is not accepting messages right now. Please reach us on LinkedIn.",
      values: raw,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `New project enquiry from ${data.name}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service || "-"}\n\n${data.details}`,
        html: `<p><strong>Name:</strong> ${escape(data.name)}<br/><strong>Email:</strong> ${escape(
          data.email,
        )}<br/><strong>Service:</strong> ${escape(data.service || "-")}</p><p>${escape(data.details).replace(
          /\n/g,
          "<br/>",
        )}</p>`,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch (err) {
    console.error("[contact] send failed", err);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again shortly.",
      values: raw,
    };
  }

  return { status: "success", message: "Thanks. Your message is with the team and we will reply soon." };
}
