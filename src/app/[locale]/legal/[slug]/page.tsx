// Legal pages: /legal/legal-notice, /legal/privacy, /legal/accessibility.
// Text lives in src/messages/{fr,en}/legal.json; company identifiers in src/messages/company.json.
// A company field left empty in company.json is simply not displayed.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import company from "@/messages/company.json";
import enLegal from "@/messages/en/legal.json";
import frLegal from "@/messages/fr/legal.json";
import enHome from "@/messages/en/home.json";
import frHome from "@/messages/fr/home.json";
import { getCommon } from "@/i18n/common";
import { isExternalHref, withLocale } from "@/app/[locale]/_components/utils";

type Block = { p?: string; ul?: string[]; dl?: string[]; requires?: string };
type Section = { id: string; title: string; requires?: string; blocks: Block[] };
type LegalPageMsgs = { nav: string; title: string; intro: string; sections: Section[] };
type LegalMsgs = {
  ui: { kicker: string; updated: string; toc: string; fields: Record<string, string> };
  updated: string;
  pages: Record<string, LegalPageMsgs>;
};

const SLUGS = ["legal-notice", "privacy", "accessibility"] as const;
const MSGS: Record<"fr" | "en", LegalMsgs> = { fr: frLegal, en: enLegal };
const CONTACT = { fr: frHome.footer.contact, en: enHome.footer.contact };
const langOf = (locale: string) => (locale === "fr-ma" ? "fr" : "en");

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

type Params = { locale: string; slug: string };

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params;
  const page = MSGS[langOf(params.locale)].pages[params.slug];
  return page ? { title: `${page.title} | Geomatic`, description: page.intro } : {};
}

const focusRing =
  "rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2";
const textLink = `font-medium text-[#0079c1] underline underline-offset-4 hover:text-[#005e95] hover:no-underline ${focusRing}`;

export default async function LegalPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const { locale, slug } = params;
  const lang = langOf(locale);
  const msgs = MSGS[lang];
  const page = msgs.pages[slug];
  const contact = CONTACT[lang];
  const common = getCommon(locale);

  /** Values available to {tokens} and to definition lists. Empty ones are skipped. */
  const values: Record<string, string> = {
    ...company,
    address: contact.address.join(", "),
    phone: contact.phones.join(" · "),
    fax: contact.fax,
    email: contact.email,
  };
  const has = (key?: string) => !key || Boolean(values[key]?.trim());

  const link = (label: string, href: string, key: number) => {
    if (href.startsWith("mailto:")) {
      return <a key={key} href={href} className={textLink}>{label}</a>;
    }
    if (isExternalHref(href)) {
      return (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={textLink}>
          {label}
          <span className="sr-only"> {common.opensInNewTab}</span>
        </a>
      );
    }
    return <Link key={key} href={withLocale(locale, href)} className={textLink}>{label}</Link>;
  };

  /** Fills {tokens}, then turns [label](href) into links. */
  const rich = (text: string): ReactNode[] => {
    const filled = text.replace(/\{(\w+)\}/g, (m, k: string) =>
      k === "email" ? `[${values.email}](mailto:${values.email})` : values[k] || m
    );
    const out: ReactNode[] = [];
    const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
    let last = 0;
    for (let m = re.exec(filled); m; m = re.exec(filled)) {
      if (m.index > last) out.push(filled.slice(last, m.index));
      out.push(link(m[1], m[2], m.index));
      last = m.index + m[0].length;
    }
    if (last < filled.length) out.push(filled.slice(last));
    return out;
  };

  const sections = page.sections.filter((s) => has(s.requires));
  const pages = SLUGS.map((s) => ({ slug: s, label: msgs.pages[s].nav }));

  return (
    <article>
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-6 lg:py-16">
          <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#005e95]">
            <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
            {msgs.ui.kicker}
          </p>
          <h1 className="mt-4 text-[34px] font-bold leading-[1.1] text-slate-900 sm:text-[44px]">
            {page.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[18px] leading-relaxed text-slate-700">{page.intro}</p>
          <p className="mt-6 text-[14px] text-slate-600">
            {msgs.ui.updated.replace("{date}", msgs.updated)}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 py-10 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:px-6 lg:py-16">
        <aside className="mb-10 lg:sticky lg:top-24 lg:mb-0 lg:self-start">
          <nav aria-label={msgs.ui.kicker}>
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {pages.map((p) => {
                const current = p.slug === slug;
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/${locale}/legal/${p.slug}`}
                      aria-current={current ? "page" : undefined}
                      className={`block border px-4 py-2.5 text-[15px] font-semibold transition-colors lg:border-0 lg:border-l-[3px] ${focusRing} ${
                        current
                          ? "border-[#0079c1] bg-[#0079c1]/[0.08] text-[#005e95]"
                          : "border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 lg:border-transparent"
                      }`}
                    >
                      {p.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <nav aria-label={msgs.ui.toc} className="mt-10 hidden lg:block">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              {msgs.ui.toc}
            </h2>
            <ul className="mt-4 space-y-3 border-l border-slate-200 pl-4 text-[15px]">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`text-slate-700 underline-offset-4 hover:text-black hover:underline ${focusRing}`}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="max-w-[70ch] space-y-12 text-[17px] leading-relaxed text-slate-700">
          {sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24">
              <h2 id={`${s.id}-title`} className="text-[24px] font-semibold leading-snug text-slate-900">
                {s.title}
              </h2>
              <div className="mt-4 space-y-4">
                {s.blocks.filter((b) => has(b.requires)).map((b, i) => {
                  if (b.p) return <p key={i}>{rich(b.p)}</p>;
                  if (b.ul) {
                    return (
                      <ul key={i} className="list-disc space-y-2 pl-5 marker:text-[#0079c1]">
                        {b.ul.map((item) => (
                          <li key={item} className="pl-1">{rich(item)}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (b.dl) {
                    return (
                      <dl key={i} className="divide-y divide-slate-200 border-y border-slate-200">
                        {b.dl.filter((k) => has(k) && values[k]).map((k) => (
                          <div key={k} className="py-3 sm:grid sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-4">
                            <dt className="text-[15px] font-semibold text-slate-900">{msgs.ui.fields[k]}</dt>
                            <dd className="break-words">
                              {k === "email" ? rich("{email}") : values[k]}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    );
                  }
                  return null;
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
