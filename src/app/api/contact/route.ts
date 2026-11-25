// POST /api/contact — receives the contact form and forwards it by e-mail (SMTP).
// Nothing is stored: the message only goes to the mailbox of its subject (see MAILBOXES below).
// Configuration: see .env.example (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_FROM, CONTACT_TO…).
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  CONTACT_LIMITS as LIMITS,
  CONTACT_TOPICS,
  EMAIL_RE,
  PHONE_RE,
  type ContactTopicKey,
} from "@/app/[locale]/about-geomatic/contact/form-rules";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOPIC_LABELS: Record<ContactTopicKey, string> = {
  sales: "Ventes et licences",
  support: "Support et service client",
  training: "Formation",
  consulting: "Conseil",
  other: "Autre demande",
};

/* ---- Mailboxes: one per subject. Each can be changed in .env.local without touching this file. ---- */
const MAILBOXES = {
  general: "contact@geomatic.ma",
  sales: "sales@geomatic.ma",
  support: "support@geomatic.ma",
} as const;

/** A mailbox set in the environment, or the default one when it is missing or not an e-mail address. */
function mailbox(envName: string, fallback: string): string {
  const value = (process.env[envName] ?? "").trim();
  if (!value) return fallback;
  if (EMAIL_RE.test(value)) return value;
  console.error(`[contact] ${envName} is not a valid e-mail address: ${fallback} is used instead.`);
  return fallback;
}

/** Where a message goes: sales and support have their own mailbox, every other subject goes to the general one. */
function recipientFor(topic: ContactTopicKey): string {
  const general = mailbox("CONTACT_TO", MAILBOXES.general);
  switch (topic) {
    case "sales":
      return mailbox("CONTACT_TO_SALES", MAILBOXES.sales);
    case "support":
      return mailbox("CONTACT_TO_SUPPORT", MAILBOXES.support);
    case "training":
      return mailbox("CONTACT_TO_TRAINING", general);
    case "consulting":
      return mailbox("CONTACT_TO_CONSULTING", general);
    default:
      return general;
  }
}

/* ---- Abuse limits, kept in memory only (times of the last messages, never their content) ----
   - 5 messages per 10 minutes per address;
   - 30 messages per 10 minutes for the whole site: the address comes from a header a robot can forge
     when no proxy stands in front of the site, so this ceiling is what protects the mailboxes from a flood. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_TOTAL_PER_WINDOW = 30;
const hits = new Map<string, number[]>();
let allHits: number[] = [];
let ceilingLoggedAt = 0;

/** Counts the message when it may go; otherwise says which limit stops it. */
function checkLimits(ip: string): "ok" | "address" | "site" {
  const now = Date.now();
  const fresh = (t: number) => now - t < WINDOW_MS;

  const recent = (hits.get(ip) ?? []).filter(fresh);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return "address";
  }

  allHits = allHits.filter(fresh);
  if (allHits.length >= MAX_TOTAL_PER_WINDOW) {
    // one line per window in the log, so a flood does not fill it
    if (now - ceilingLoggedAt >= WINDOW_MS) {
      ceilingLoggedAt = now;
      console.error(`[contact] ${MAX_TOTAL_PER_WINDOW} messages in 10 minutes: further messages are refused until the pace slows down.`);
    }
    return "site";
  }

  // nothing is recorded for a refused message, so forged addresses cannot fill the memory
  recent.push(now);
  hits.set(ip, recent);
  allHits.push(now);
  if (hits.size > 5000) {
    hits.forEach((times, key) => {
      if (!times.some(fresh)) hits.delete(key);
    });
  }
  return "ok";
}

/** One-line text: no line breaks or control characters (prevents header injection), trimmed and capped. */
const line = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max) : "";

const json = (body: object, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/** Largest request accepted, in bytes: a full message in any alphabet fits well within it. */
const MAX_BODY_BYTES = 32_000;

/** The text of the request, or null when it is larger than `max`: reading stops there, the rest is never loaded. */
async function readBody(req: Request, max: number): Promise<string | null> {
  if (Number(req.headers.get("content-length")) > max) return null;
  const reader = req.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

export async function POST(req: Request) {
  // Only accept the form of this site.
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ error: "forbidden" }, 403);
    } catch {
      return json({ error: "forbidden" }, 403);
    }
  }
  if (!(req.headers.get("content-type") ?? "").includes("application/json")) {
    return json({ error: "invalid" }, 415);
  }

  const raw = await readBody(req, MAX_BODY_BYTES);
  if (raw === null) return json({ error: "invalid" }, 413);
  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("shape");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "invalid" }, 400);
  }

  // Honeypot: a field people never see. Robots that fill it get a normal answer and nothing is sent.
  // ("website" is its former name: browsers could fill it by themselves; it stays refused for robots that kept it.)
  if ([body.trap, body.website].some((v) => typeof v === "string" && v.trim() !== "")) {
    return json({ ok: true }, 200);
  }

  const name = line(body.name, LIMITS.name);
  const organization = line(body.organization, LIMITS.organization);
  const email = line(body.email, LIMITS.email);
  const phone = line(body.phone, LIMITS.phone);
  const topic = line(body.topic, 20) as ContactTopicKey;
  const message =
    typeof body.message === "string"
      ? body.message.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").trim()
      : "";

  const fields: string[] = [];
  if (name.length < 2) fields.push("name");
  if (!EMAIL_RE.test(email)) fields.push("email");
  if (phone && !PHONE_RE.test(phone)) fields.push("phone");
  if (!CONTACT_TOPICS.includes(topic)) fields.push("topic");
  if (message.length < LIMITS.messageMin || message.length > LIMITS.message) fields.push("message");
  if (body.consent !== true) fields.push("consent");
  if (fields.length) return json({ error: "invalid", fields }, 400);

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";

  const smtpHost = process.env.SMTP_HOST;
  if (!smtpHost) {
    console.error("[contact] SMTP_HOST is not set: the contact form cannot send e-mail (see .env.example).");
    return json({ error: "not_configured" }, 503);
  }

  const limit = checkLimits(ip);
  if (limit === "address") return json({ error: "rate_limited" }, 429);
  // The visitor did nothing wrong: the form shows the general failure message, with the address to write to instead.
  if (limit === "site") return json({ error: "busy" }, 503);
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  // Some providers present a certificate issued for their own name rather than for the customer's domain:
  // the certificate is then checked against that name (it is still fully verified).
  const tlsName = process.env.SMTP_TLS_SERVERNAME?.trim();
  const to = recipientFor(topic);
  // The sender must be an address the mail server accepts: by default the account that logs in.
  const from = mailbox("CONTACT_FROM", user && EMAIL_RE.test(user) ? user : mailbox("CONTACT_TO", MAILBOXES.general));

  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;

  try {
    const transport = nodemailer.createTransport({
      host: smtpHost,
      port,
      secure,
      // On port 587 the connection starts unencrypted: nothing (and above all not the password) is sent
      // unless the server switches to encryption. SMTP_REQUIRE_TLS=false is for a local test server only.
      requireTLS: !secure && process.env.SMTP_REQUIRE_TLS !== "false",
      auth: user ? { user, pass: process.env.SMTP_PASS ?? "" } : undefined,
      tls: tlsName ? { servername: tlsName } : undefined,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
    await transport.sendMail({
      from: { name: "Site web Geomatic", address: from },
      to,
      replyTo: { name, address: email },
      subject: `[Site web] ${TOPIC_LABELS[topic]} — ${name}`,
      text: [
        `Sujet : ${TOPIC_LABELS[topic]}`,
        `Nom : ${name}`,
        `Organisme : ${organization || "—"}`,
        `E-mail : ${email}`,
        `Téléphone : ${phone || "—"}`,
        "",
        "Message :",
        message,
        "",
        "—",
        "Message envoyé depuis le formulaire de contact du site. Répondre à cet e-mail écrit directement à l’expéditeur.",
      ].join("\n"),
    });
  } catch (err) {
    // Log the technical reason only, never the content of the message.
    console.error("[contact] sending failed:", err instanceof Error ? err.message : err);
    return json({ error: "send_failed" }, 502);
  }

  return json({ ok: true }, 200);
}
