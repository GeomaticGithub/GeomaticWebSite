"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RiArrowRightUpLine, RiSearchLine } from "react-icons/ri";
import { useCommon } from "@/i18n/useCommon";
import { focusRing, kickerClass, resolveProductLink, type ProductsIndexMessages } from "../constants";

/** Lowercase + strip accents so "geo" matches "Géo". */
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const slug = (s: string) => fold(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** The whole catalogue: every product family with its links, and a field to filter them. */
export default function LinkMatrix({
  data,
  ui,
  locale,
}: {
  data: ProductsIndexMessages["matrix"];
  ui: ProductsIndexMessages["ui"];
  locale: string;
}) {
  const common = useCommon();
  const [query, setQuery] = useState("");

  // one flat, de-duplicated list of links per family
  const groups = useMemo(
    () =>
      data.groups.map((g) => {
        const seen = new Set<string>();
        const links = g.columns
          .flat()
          .filter((l) => (seen.has(l.label) ? false : (seen.add(l.label), true)))
          .map((l) => ({ label: l.label, key: fold(l.label), ...resolveProductLink(l.label, l.href, locale) }));
        return { title: g.title, id: `catalogue-${slug(g.title)}`, links };
      }),
    [data.groups, locale]
  );

  const words = fold(query).split(/\s+/).filter(Boolean);
  const shown = groups
    .map((g) => ({ ...g, links: words.length ? g.links.filter((l) => words.every((w) => l.key.includes(w))) : g.links }))
    .filter((g) => g.links.length > 0);
  const total = shown.reduce((n, g) => n + g.links.length, 0);

  return (
    <section id="catalogue" aria-labelledby="catalogue-title" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-6 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className={kickerClass}>
              <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
              {ui.matrixKicker}
            </p>
            <h2 id="catalogue-title" className="mt-4 text-[30px] font-bold leading-[1.12] text-slate-900 sm:text-[40px]">
              {data.title}
            </h2>
          </div>

          <div className="w-full lg:max-w-md">
            <label htmlFor="catalogue-filter" className="mb-1.5 block text-[15px] font-semibold text-slate-900">
              {ui.filterLabel}
            </label>
            <div className="relative">
              <RiSearchLine className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" aria-hidden />
              <input
                id="catalogue-filter"
                type="text"
                inputMode="search"
                autoComplete="off"
                spellCheck={false}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={ui.filterPlaceholder}
                className="h-12 w-full rounded-md border border-slate-500 bg-white pl-11 pr-24 text-[16px] text-slate-900 placeholder:text-slate-500 transition-colors hover:border-slate-700 focus:border-[#0079c1] focus:outline-none focus:ring-2 focus:ring-[#0079c1]/30"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 rounded px-2.5 py-1.5 text-[13px] font-medium text-slate-700 hover:bg-slate-100 ${focusRing}`}
                >
                  {ui.clear}
                </button>
              )}
            </div>
            <p role="status" className="mt-2 text-[14px] text-slate-600">
              {total > 0 ? ui.count.replace("{count}", String(total)) : ui.noResult.replace("{query}", query.trim())}
            </p>
          </div>
        </div>

        {/* Shortcuts to each family */}
        {!words.length && (
          <ul className="mt-8 flex flex-wrap gap-2">
            {groups.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  className={`inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-4 py-1.5 text-[14px] font-medium text-slate-800 transition-colors hover:border-[#0079c1] hover:text-[#005e95] ${focusRing}`}
                >
                  {g.title}
                  <span className="text-slate-500">{g.links.length}</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 space-y-5">
          {shown.map((g) => (
            <section
              key={g.id}
              id={g.id}
              aria-labelledby={`${g.id}-title`}
              className="scroll-mt-20 rounded-lg border border-slate-200 bg-white p-5 sm:p-7"
            >
              <h3 id={`${g.id}-title`} className="flex items-baseline gap-3 text-[20px] font-semibold text-slate-900">
                {g.title}
                <span className="text-[14px] font-medium text-slate-500">{g.links.length}</span>
              </h3>
              <ul className="mt-4 columns-1 gap-x-10 border-t border-slate-200 pt-4 sm:columns-2 lg:columns-3">
                {g.links.map((l) => (
                  <li key={l.label} className="break-inside-avoid py-[5px] text-[15px] leading-snug">
                    {!l.href ? (
                      <span className="text-slate-700">{l.label}</span>
                    ) : l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group inline-flex items-baseline gap-1.5 text-slate-800 underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
                      >
                        {l.label}
                        <RiArrowRightUpLine className="h-3.5 w-3.5 shrink-0 translate-y-0.5 text-slate-400 group-hover:text-[#0079c1]" aria-hidden />
                        <span className="sr-only"> {common.opensInNewTab}</span>
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className={`font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
