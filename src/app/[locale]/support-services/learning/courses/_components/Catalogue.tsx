"use client";

import { useMemo, useState } from "react";
import { RiFileList3Line, RiSearchLine } from "react-icons/ri";
import { COURSE_THEMES, type CatalogueUi, type Course, type CourseTheme } from "../constants";

const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2";

/** Lowercase + strip accents so "geodatabase" matches "géodatabase". */
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** The whole catalogue, grouped by theme, with a search field and one button per theme. */
export default function Catalogue({ title, courses, ui }: { title: string; courses: Course[]; ui: CatalogueUi }) {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<CourseTheme | "all">("all");

  const indexed = useMemo(() => courses.map((c) => ({ ...c, key: fold(`${c.title} ${ui.categories[c.category]}`) })), [courses, ui.categories]);
  const words = fold(query).split(/\s+/).filter(Boolean);
  const matching = words.length ? indexed.filter((c) => words.every((w) => c.key.includes(w))) : indexed;
  const groups = COURSE_THEMES.map((key) => ({
    key,
    name: ui.categories[key],
    all: matching.filter((c) => c.category === key),
  }));
  const shown = groups.filter((g) => (theme === "all" || g.key === theme) && g.all.length > 0);
  const total = shown.reduce((n, g) => n + g.all.length, 0);
  const countText = (n: number) => (n === 1 ? ui.countOne : ui.count.replace("{count}", String(n)));
  const reset = () => {
    setQuery("");
    setTheme("all");
  };

  const chip = (on: boolean) =>
    `inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[14px] font-medium transition-colors ${focusRing} ${
      on ? "border-[#0079c1] bg-[#0079c1] text-white" : "border-slate-300 bg-white text-slate-800 hover:border-[#0079c1] hover:text-[#005e95]"
    }`;

  return (
    <section id="catalogue" aria-labelledby="catalogue-title" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-6 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#005e95]">
              <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
              {ui.catalogKicker}
            </p>
            <h2 id="catalogue-title" className="mt-4 text-[30px] font-bold leading-[1.12] text-slate-900 sm:text-[40px]">
              {title}
            </h2>
          </div>

          <div className="w-full lg:max-w-md">
            <label htmlFor="course-filter" className="mb-1.5 block text-[15px] font-semibold text-slate-900">
              {ui.filterLabel}
            </label>
            <div className="relative">
              <RiSearchLine className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" aria-hidden />
              <input
                id="course-filter"
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
          </div>
        </div>

        {/* One button per theme; the numbers follow the search */}
        <div role="group" aria-label={ui.themes} className="mt-8 flex flex-wrap gap-2">
          <button type="button" aria-pressed={theme === "all"} onClick={() => setTheme("all")} className={chip(theme === "all")}>
            {ui.all}
            <span className={theme === "all" ? "text-white/80" : "text-slate-500"}>{matching.length}</span>
          </button>
          {groups.map((g) => {
            const on = theme === g.key;
            return (
              <button key={g.key} type="button" aria-pressed={on} onClick={() => setTheme(on ? "all" : g.key)} className={chip(on)}>
                {g.name}
                <span className={on ? "text-white/80" : "text-slate-500"}>{g.all.length}</span>
              </button>
            );
          })}
        </div>

        <p role="status" className="mt-5 text-[15px] text-slate-700">
          {total > 0 ? countText(total) : ui.noResult.replace("{query}", query.trim())}
        </p>

        {total === 0 && (
          <button
            type="button"
            onClick={reset}
            className={`mt-4 inline-flex items-center border border-slate-500 bg-white px-5 py-3 text-[15px] font-semibold text-slate-900 transition-colors hover:bg-slate-50 ${focusRing}`}
          >
            {ui.reset}
          </button>
        )}

        <div className="mt-6 space-y-10">
          {shown.map((g) => (
            <section key={g.key} aria-labelledby={`theme-${g.key}`}>
              <h3 id={`theme-${g.key}`} className="flex items-baseline gap-3 border-b border-slate-200 pb-3 text-[22px] font-semibold text-slate-900">
                {g.name}
                <span className="text-[14px] font-medium text-slate-500">{g.all.length}</span>
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {g.all.map((c) => (
                  <li key={c.link} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-4">
                    <RiFileList3Line className="mt-0.5 h-5 w-5 shrink-0 text-[#0079c1]" aria-hidden />
                    <span className="text-[15px] font-semibold leading-snug text-slate-900">{c.title}</span>
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
