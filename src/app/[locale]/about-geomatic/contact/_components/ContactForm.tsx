"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiLoader4Line,
  RiSendPlaneFill,
} from "react-icons/ri";
import { focusRing, type ContactFormMsgs } from "../constants";
import { CONTACT_LIMITS as LIMITS, CONTACT_TOPICS, EMAIL_RE, PHONE_RE } from "../form-rules";

type Values = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  consent: boolean;
  /** Honeypot: hidden from people, must stay empty. Its name is one no browser fills by itself. */
  trap: string;
};
type FieldKey = "name" | "email" | "phone" | "topic" | "message" | "consent";
type Errors = Partial<Record<FieldKey, string>>;

const EMPTY: Values = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
  consent: false,
  trap: "",
};
const ORDER: FieldKey[] = ["name", "email", "phone", "topic", "message", "consent"];

const control =
  "block w-full rounded-md border bg-white px-3.5 text-[16px] text-slate-900 placeholder:text-slate-500 " +
  "transition-colors focus:outline-none focus:ring-2 focus:ring-[#0079c1]/30";
const controlState = (invalid: boolean) =>
  invalid
    ? "border-red-600 focus:border-red-600 focus:ring-red-600/25"
    : "border-slate-500 hover:border-slate-700 focus:border-[#0079c1]";

export default function ContactForm({
  t,
  locale,
  fallbackEmail,
}: {
  t: ContactFormMsgs;
  locale: string;
  fallbackEmail: string;
}) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [failure, setFailure] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  const set = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const check = (key: FieldKey, v: Values): string | undefined => {
    switch (key) {
      case "name":
        return v.name.trim().length < 2 ? t.errors.name : undefined;
      case "email":
        return EMAIL_RE.test(v.email.trim()) ? undefined : t.errors.email;
      case "phone":
        return v.phone.trim() && !PHONE_RE.test(v.phone.trim()) ? t.errors.phone : undefined;
      case "topic":
        return (CONTACT_TOPICS as readonly string[]).includes(v.topic) ? undefined : t.errors.topic;
      case "message":
        return v.message.trim().length < LIMITS.messageMin ? t.errors.message : undefined;
      case "consent":
        return v.consent ? undefined : t.errors.consent;
    }
  };

  // Validate a field when leaving it; an error already shown clears as soon as the value is fixed.
  const onBlur = (key: FieldKey) => setErrors((e) => ({ ...e, [key]: check(key, values) }));
  useEffect(() => {
    setErrors((e) => {
      let changed = false;
      const next = { ...e };
      for (const k of ORDER) {
        if (next[k] && !check(k, values)) {
          delete next[k];
          changed = true;
        }
      }
      return changed ? next : e;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  const focusField = (key: FieldKey) =>
    formRef.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setFailure(null);

    const found: Errors = {};
    for (const k of ORDER) {
      const msg = check(k, values);
      if (msg) found[k] = msg;
    }
    setErrors(found);
    const first = ORDER.find((k) => found[k]);
    if (first) {
      focusField(first);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (res.ok) {
        setValues(EMPTY);
        setStatus("sent");
        return;
      }
      const data: { error?: string; fields?: string[] } = await res.json().catch(() => ({}));
      if (res.status === 400 && data.fields?.length) {
        // The server found a problem the browser check missed: show it on the fields.
        const fromServer: Errors = {};
        for (const k of ORDER) if (data.fields.includes(k)) fromServer[k] = t.errors[k];
        setErrors(fromServer);
        const k = ORDER.find((x) => fromServer[x]);
        if (k) focusField(k);
      } else if (res.status === 429) {
        setFailure(t.errors.rateLimited);
      } else {
        setFailure(t.errors.failed);
      }
    } catch {
      setFailure(t.errors.failed);
    }
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-emerald-600/40 bg-emerald-50 p-6 focus:outline-none sm:p-8"
      >
        <RiCheckboxCircleFill className="h-10 w-10 text-emerald-700" aria-hidden />
        <h3 className="mt-4 text-[24px] font-semibold leading-snug text-slate-900">{t.success.title}</h3>
        <p className="mt-2 text-[17px] leading-relaxed text-slate-800">{t.success.text}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={`mt-6 inline-flex items-center border border-slate-500 bg-white px-5 py-3 text-[15px] font-semibold text-slate-900 transition-colors hover:bg-slate-50 ${focusRing}`}
        >
          {t.success.again}
        </button>
      </div>
    );
  }

  const hasErrors = ORDER.some((k) => errors[k]);
  const sending = status === "sending";

  const field = (
    key: keyof Values & string,
    label: string,
    opts: { optional?: boolean; hint?: ReactNode; className?: string },
    render: (p: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode
  ) => {
    const id = `contact-${key}`;
    const error = errors[key as FieldKey];
    const describedBy = [error ? `${id}-error` : "", opts.hint ? `${id}-hint` : ""].filter(Boolean).join(" ");
    return (
      <div className={opts.className}>
        <label htmlFor={id} className="mb-1.5 flex items-baseline gap-2 text-[15px] font-semibold text-slate-900">
          {label}
          {opts.optional && <span className="font-normal text-slate-600">({t.optional})</span>}
        </label>
        {render({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy || undefined })}
        {opts.hint && !error && (
          <p id={`${id}-hint`} className="mt-1.5 text-[13px] tabular-nums text-slate-600">
            {opts.hint}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-[14px] font-medium text-red-700">
            <RiErrorWarningFill className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={sending}>
      <p className="text-[14px] text-slate-600">{t.requiredNote}</p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {field("name", t.name, {}, (a) => (
          <input
            {...a}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => onBlur("name")}
            className={`${control} h-12 ${controlState(a["aria-invalid"])}`}
          />
        ))}
        {field("organization", t.organization, { optional: true }, (a) => (
          <input
            {...a}
            name="organization"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.organization}
            value={values.organization}
            onChange={(e) => set("organization", e.target.value)}
            className={`${control} h-12 ${controlState(false)}`}
          />
        ))}
        {field("email", t.email, {}, (a) => (
          <input
            {...a}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            maxLength={LIMITS.email}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => onBlur("email")}
            className={`${control} h-12 ${controlState(a["aria-invalid"])}`}
          />
        ))}
        {field("phone", t.phone, { optional: true }, (a) => (
          <input
            {...a}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => onBlur("phone")}
            className={`${control} h-12 ${controlState(a["aria-invalid"])}`}
          />
        ))}
        {field("topic", t.topic, { className: "sm:col-span-2" }, (a) => (
          <select
            {...a}
            name="topic"
            required
            value={values.topic}
            onChange={(e) => set("topic", e.target.value)}
            onBlur={() => onBlur("topic")}
            className={`${control} h-12 ${controlState(a["aria-invalid"])} ${values.topic ? "" : "text-slate-600"}`}
          >
            <option value="" disabled>
              {t.topicPlaceholder}
            </option>
            {CONTACT_TOPICS.map((k) => (
              <option key={k} value={k} className="text-slate-900">
                {t.topics[k]}
              </option>
            ))}
          </select>
        ))}
        {field(
          "message",
          t.message,
          {
            className: "sm:col-span-2",
            hint: t.messageHint
              .replace("{count}", String(values.message.length))
              .replace("{max}", String(LIMITS.message)),
          },
          (a) => (
            <textarea
              {...a}
              name="message"
              rows={6}
              required
              maxLength={LIMITS.message}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              onBlur={() => onBlur("message")}
              className={`${control} min-h-[9rem] resize-y py-3 leading-relaxed ${controlState(a["aria-invalid"])}`}
            />
          )
        )}
      </div>

      {/* Honeypot: off-screen, out of the tab order and hidden from assistive technology */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          {t.trapLabel}
          <input
            type="text"
            name="trap"
            tabIndex={-1}
            autoComplete="off"
            value={values.trap}
            onChange={(e) => set("trap", e.target.value)}
          />
        </label>
      </div>

      <div className="mt-6">
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "contact-consent-error" : undefined}
            className={`mt-0.5 h-5 w-5 shrink-0 rounded border-slate-500 accent-[#0079c1] ${focusRing}`}
          />
          <div className="text-[15px] leading-relaxed text-slate-800">
            <label htmlFor="contact-consent">{t.consent}</label>{" "}
            <Link
              href={`/${locale}/legal/privacy`}
              className={`font-medium text-[#0079c1] underline underline-offset-4 hover:text-[#005e95] hover:no-underline ${focusRing}`}
            >
              {t.privacy}
            </Link>
          </div>
        </div>
        {errors.consent && (
          <p id="contact-consent-error" className="mt-1.5 flex items-start gap-1.5 text-[14px] font-medium text-red-700">
            <RiErrorWarningFill className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {errors.consent}
          </p>
        )}
      </div>

      {/* Announced by screen readers when the form is refused or the sending fails */}
      <div role="alert" className="mt-6 empty:mt-0">
        {(failure || hasErrors) && (
          <p className="flex items-start gap-2.5 rounded-md border border-red-600/40 bg-red-50 px-4 py-3 text-[15px] leading-relaxed text-red-800">
            <RiErrorWarningFill className="mt-0.5 h-5 w-5 shrink-0 text-red-700" aria-hidden />
            <span>
              {failure
                ? failure.split("{email}").flatMap((part, i) =>
                    i === 0
                      ? [part]
                      : [
                          <a key={i} href={`mailto:${fallbackEmail}`} className="font-semibold underline underline-offset-4">
                            {fallbackEmail}
                          </a>,
                          part,
                        ]
                  )
                : t.errors.summary}
            </span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={sending}
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#0079c1] px-7 py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#005e95] disabled:cursor-wait disabled:opacity-70 sm:w-auto ${focusRing}`}
      >
        {sending ? (
          <RiLoader4Line className="h-5 w-5 animate-spin motion-reduce:animate-none" aria-hidden />
        ) : (
          <RiSendPlaneFill className="h-5 w-5" aria-hidden />
        )}
        {sending ? t.sending : t.submit}
      </button>
    </form>
  );
}
