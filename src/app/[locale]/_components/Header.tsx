"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiSearchLine,
  RiGlobalLine,
  RiMenuLine,
  RiCloseLine,
  RiArrowRightSLine,
  RiCornerDownLeftLine,
  RiFileList2Line,
  RiCompass3Line,
  RiCheckLine,
} from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";

import MobileMenu from "./MobileMenu";
import type { NavMessages, SectionRaw, ModalType } from "./types";
import { buildMenus, type Menus } from "./buildMenus";
import {
  withLocale,
  getCurrentLocaleFromPath,
  normalizeSections,
  switchLocaleInPath,
  splitIntoColumns,
  LANGUAGES,
  type LocaleCode,
} from "./utils";
import { useDialog } from "./useDialog";
import { getCommon } from "@/i18n/common";

const headerIconBtn =
  "flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors " +
  "hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1]";

/** Lowercase + strip accents so "geo" matches "Géo". */
const fold = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

type SearchEntry = { label: string; href: string; context: string };

/** Pages offered before anything is typed (only those present in the navigation are shown). */
const SUGGESTED = [
  "/arcgis/products/arcgis-online/overview",
  "/arcgis/products/arcgis-pro/overview",
  "/arcgis/products/arcgis-enterprise/overview",
  "/support-services/learning",
  "/what-is-gis/overview",
  "/about-geomatic/contact",
];

/** Marks the parts of `text` that match the typed words (accent-insensitive). */
function highlight(text: string, words: string[]): React.ReactNode {
  const folded = fold(text);
  if (!words.length || folded.length !== text.length) return text;
  const hit = new Array<boolean>(text.length).fill(false);
  for (const w of words) {
    for (let i = folded.indexOf(w); i !== -1; i = folded.indexOf(w, i + w.length)) {
      hit.fill(true, i, i + w.length);
    }
  }
  const out: React.ReactNode[] = [];
  for (let i = 0; i < text.length; ) {
    let j = i;
    while (j < text.length && hit[j] === hit[i]) j++;
    const part = text.slice(i, j);
    out.push(
      hit[i] ? (
        <mark key={i} className="bg-transparent font-semibold text-[#0079c1]">
          {part}
        </mark>
      ) : (
        part
      )
    );
    i = j;
  }
  return out;
}

const kbd =
  "inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded border border-slate-300 bg-white px-1.5 font-sans text-[12px] font-medium text-slate-700";

/** Every page reachable from the navigation, de-duplicated by URL. */
function buildSearchIndex(menus: Menus): SearchEntry[] {
  const seen = new Set<string>();
  const out: SearchEntry[] = [];
  for (const entry of Object.values(menus)) {
    for (const sec of normalizeSections(entry.sections)) {
      for (const link of sec.links) {
        if (seen.has(link.href)) continue;
        seen.add(link.href);
        out.push({
          label: link.label,
          href: link.href,
          context: sec.heading ? `${entry.label} › ${sec.heading}` : entry.label,
        });
      }
    }
  }
  return out;
}

/* ---------------- HeaderItem Component ---------------- */
function HeaderItem({
  label,
  sectionsRaw,
  currentLocale,
  pathname,
}: {
  label: string;
  sectionsRaw: SectionRaw[];
  currentLocale: string;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(
    null
  );
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const sections = useMemo(() => normalizeSections(sectionsRaw), [sectionsRaw]);

  // Current page belongs to this menu → underline the menu label (nav-state-active).
  const isCurrent = useMemo(
    () =>
      sections.some((s) =>
        s.links.some((l) => withLocale(currentLocale, l.href) === pathname)
      ),
    [sections, currentLocale, pathname]
  );

  const current = sections[active] || sections[0];
  const hasSidebar = sections.length > 1 && !!sections[0]?.heading;
  const cols = Math.max(
    1,
    Math.min(3, Math.ceil((current?.links?.length || 0) / 7))
  );
  const colClass =
    cols === 3
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : cols === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1";
  const chunks = splitIntoColumns(current?.links ?? [], cols);

  const widthPx = hasSidebar
    ? cols === 3
      ? 1000
      : cols === 2
      ? 840
      : 700
    : cols === 3
    ? 800
    : cols === 2
    ? 560
    : 288; // single column (Support, News, About): fits the longest label without empty space

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!panelRef.current || !btnRef.current) return;
      const t = e.target as Node;
      if (!panelRef.current.contains(t) && !btnRef.current.contains(t))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }
    const calc = () => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const header = btnRef.current.closest("header");
      const vw = window.innerWidth;
      const left = Math.max(12, Math.min(vw - widthPx - 12, rect.left));
      // Panel starts right under the header's bottom border.
      setCoords({ left, top: (header?.getBoundingClientRect().bottom ?? rect.bottom) });
    };
    requestAnimationFrame(calc);
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [open, widthPx]);

  // Early return only after every hook has run (rules of hooks).
  if (!sections.length || !current) return null;

  return (
    <li className="h-full">
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={[
          "group relative flex items-center gap-1 h-full px-3 xl:px-4 text-[15px] font-semibold tracking-[-0.005em] transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0079c1]",
          // bottom indicator bar: brand blue when open or on a page of this menu
          "after:absolute after:inset-x-3 xl:after:inset-x-4 after:bottom-0 after:h-[3px] after:rounded-t-sm after:transition-colors",
          open
            ? "text-[#0079c1] after:bg-[#0079c1]"
            : isCurrent
            ? "text-slate-900 after:bg-[#0079c1]"
            : "text-slate-700 hover:text-slate-950 after:bg-transparent hover:after:bg-slate-300",
        ].join(" ")}
      >
        <span className="select-none whitespace-nowrap">{label}</span>
        <RiArrowDownSLine
          className={`h-4 w-4 opacity-70 transition-transform duration-200 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {open && coords && (
        <div
          ref={panelRef}
          style={{
            left: coords.left,
            top: coords.top,
            width: widthPx,
            maxWidth: "calc(100vw - 24px)",
          }}
          className={[
            "fixed z-40 bg-white border border-t-0 border-slate-200",
            "shadow-[0_24px_48px_-16px_rgba(15,23,42,0.22)]",
            "overflow-hidden box-border",
            "animate-menu-in motion-reduce:animate-none",
          ].join(" ")}
        >
          <div className="flex min-w-0">
            {hasSidebar && (
              <aside className="hidden md:block w-60 lg:w-64 shrink-0 bg-slate-50 border-r border-slate-200">
                <ul className="py-3">
                  {sections.map((sec, i) => {
                    const isActive = i === active;
                    return (
                      <li key={i}>
                        <button
                          type="button"
                          aria-pressed={isActive}
                          onClick={() => setActive(i)}
                          onMouseEnter={() => setActive(i)}
                          onFocus={() => setActive(i)}
                          className={[
                            "relative w-full flex items-center justify-between gap-3 text-left pl-5 pr-4 py-2.5 text-[14px] leading-snug transition-colors",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0079c1]",
                            "before:absolute before:left-0 before:inset-y-1.5 before:w-[3px] before:rounded-r-sm",
                            isActive
                              ? "bg-white font-semibold text-[#0079c1] before:bg-[#0079c1]"
                              : "font-medium text-slate-600 hover:text-slate-900 hover:bg-white/70 before:bg-transparent",
                          ].join(" ")}
                        >
                          <span>{sec.heading ?? label}</span>
                          <RiArrowRightSLine
                            className={`h-4 w-4 shrink-0 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
                            aria-hidden
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            )}

            <section className="flex-1 px-6 py-5 lg:px-7 lg:py-6 min-w-0">
              {/* With a sidebar the heading is already shown on the left, so it is not repeated here. */}
              {current.heading && !hasSidebar && (
                <p className="mb-3 text-[13px] font-semibold text-slate-500">
                  {current.heading}
                </p>
              )}

              <div className={`grid ${colClass} gap-x-8 gap-y-0.5`}>
                {chunks.map((chunk, colIdx) => (
                  <ul key={colIdx} className="space-y-0.5">
                    {chunk.map((link) => {
                      const href = withLocale(currentLocale, link.href);
                      const here = href === pathname;
                      return (
                        <li key={`${link.href}|${link.label}`}>
                          <Link
                            href={href}
                            aria-current={here ? "page" : undefined}
                            className={[
                              "group/link -mx-3 flex items-center justify-between gap-3 rounded-md px-3 py-2 text-[15px] leading-snug transition-colors",
                              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1]",
                              here
                                ? "bg-sky-50 font-semibold text-[#0079c1]"
                                : "text-slate-700 hover:bg-slate-50 hover:text-[#0079c1]",
                            ].join(" ")}
                            onClick={() => setOpen(false)}
                          >
                            <span>{link.label}</span>
                            <RiArrowRightLine
                              className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100 motion-reduce:transition-none"
                              aria-hidden
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </li>
  );
}

/* ---------------- Search panel ---------------- */
function SearchPanel({
  data,
  index,
  currentLocale,
  inputRef,
  onNavigate,
  onClose,
}: {
  data: NavMessages;
  index: SearchEntry[];
  currentLocale: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onNavigate: () => void;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);

  const words = useMemo(() => fold(query).split(/\s+/).filter(Boolean), [query]);

  // Pages whose title matches come first, then those matched only by their menu path.
  const results = useMemo(() => {
    if (!words.length) return [];
    const inLabel: SearchEntry[] = [];
    const inContext: SearchEntry[] = [];
    for (const e of index) {
      const label = fold(e.label);
      if (words.every((w) => label.includes(w))) inLabel.push(e);
      else if (words.every((w) => fold(`${e.label} ${e.context}`).includes(w))) inContext.push(e);
    }
    return [...inLabel, ...inContext].slice(0, 8);
  }, [words, index]);

  const suggestions = useMemo(
    () =>
      SUGGESTED.map((href) => index.find((e) => e.href === href)).filter(
        (e): e is SearchEntry => Boolean(e)
      ),
    [index]
  );

  const searching = words.length > 0;
  const items = searching ? results : suggestions;
  const typed = query.trim();

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!items.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + items.length) % items.length);
    }
  };

  const RowIcon = searching ? RiFileList2Line : RiCompass3Line;

  return (
    <form
      role="search"
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        const target = items[active] ?? items[0];
        if (!target) return;
        router.push(withLocale(currentLocale, target.href));
        onNavigate();
      }}
    >
      {/* Field row: the blue bottom line is the focus indicator of the borderless input */}
      <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 pl-4 pr-2 transition-shadow focus-within:shadow-[inset_0_-2px_0_#0079c1] sm:pl-5 sm:pr-3">
        <RiSearchLine className="h-5 w-5 shrink-0 text-[#0079c1]" aria-hidden />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          inputMode="search"
          enterKeyHint="go"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={data.searchPlaceholder}
          aria-label={data.search}
          aria-describedby="site-search-hint"
          aria-autocomplete="list"
          aria-expanded={items.length > 0}
          aria-controls="site-search-list"
          aria-activedescendant={items.length ? `site-search-opt-${active}` : undefined}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="h-14 min-w-0 flex-1 bg-transparent text-[17px] text-slate-900 placeholder:text-slate-500 focus:outline-none sm:h-16 sm:text-[18px]"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="shrink-0 rounded px-2 py-1.5 text-[13px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1]"
          >
            {data.searchClear}
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={data.close}
          title={data.close}
          className={headerIconBtn + " shrink-0"}
        >
          <RiCloseLine className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <p id="site-search-hint" className="sr-only">
        {data.searchHint}
      </p>
      <p role="status" className="sr-only">
        {!searching
          ? ""
          : results.length
            ? data.searchCount.replace("{count}", String(results.length))
            : data.noResults.replace("{query}", typed)}
      </p>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
        {items.length > 0 ? (
          <>
            <p
              id="site-search-group"
              className="px-3 pb-2 pt-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600"
            >
              {searching ? data.searchResults : data.searchSuggestions}
            </p>
            <ul
              ref={listRef}
              id="site-search-list"
              role="listbox"
              aria-labelledby="site-search-group"
            >
              {items.map((r, i) => {
                const on = i === active;
                return (
                  <li key={r.href} role="presentation">
                    <Link
                      id={`site-search-opt-${i}`}
                      role="option"
                      aria-selected={on}
                      tabIndex={-1}
                      href={withLocale(currentLocale, r.href)}
                      onClick={onNavigate}
                      onMouseMove={() => setActive(i)}
                      className={[
                        "flex items-center gap-3 rounded-md px-3 py-2.5 focus:outline-none",
                        on ? "bg-sky-50" : "",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-colors",
                          on
                            ? "border-[#0079c1] bg-[#0079c1] text-white"
                            : "border-slate-200 bg-white text-slate-500",
                        ].join(" ")}
                        aria-hidden
                      >
                        <RowIcon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] font-medium text-slate-900">
                          {highlight(r.label, words)}
                        </span>
                        <span className="block truncate text-[13px] text-slate-600">
                          {r.context}
                        </span>
                      </span>
                      <RiCornerDownLeftLine
                        className={`hidden h-4 w-4 shrink-0 text-[#0079c1] sm:block ${on ? "" : "invisible"}`}
                        aria-hidden
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div className="px-6 py-12 text-center" aria-hidden>
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <RiSearchLine className="h-6 w-6" />
            </span>
            <p className="mt-4 text-[16px] font-semibold text-slate-900">
              {data.noResults.replace("{query}", typed)}
            </p>
            <p className="mt-1 text-[14px] text-slate-600">{data.noResultsHint}</p>
          </div>
        )}
      </div>

      {/* Keyboard legend (the same help is read to screen readers from #site-search-hint) */}
      <div
        className="hidden shrink-0 items-center gap-5 border-t border-slate-200 bg-slate-50 px-5 py-2.5 text-[13px] text-slate-600 sm:flex"
        aria-hidden
      >
        {items.length > 0 && (
          <>
            <span className="flex items-center gap-1.5">
              <kbd className={kbd}>↑</kbd>
              <kbd className={kbd}>↓</kbd>
              {data.kbdNavigate}
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className={kbd}>↵</kbd>
              {data.kbdOpen}
            </span>
          </>
        )}
        <span className="ml-auto flex items-center gap-1.5">
          <kbd className={kbd}>{data.kbdEsc}</kbd>
          {data.kbdClose}
        </span>
      </div>
    </form>
  );
}

/* ------------------- Main Header ------------------- */
export default function Header({
  data,
  locale,
}: {
  data: NavMessages;
  locale: string;
}) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const currentLocale = getCurrentLocaleFromPath(pathname);

  const menus = useMemo(() => buildMenus(data), [data]);
  const menuKeys = Object.keys(menus) as (keyof typeof menus)[];
  const searchIndex = useMemo(() => buildSearchIndex(menus), [menus]);

  const [modal, setModal] = useState<ModalType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const currentLangBtnRef = useRef<HTMLButtonElement | null>(null);

  const closeModal = () => setModal(null);

  useDialog(
    modal !== null,
    modalRef,
    closeModal,
    modal === "search" ? searchInputRef : currentLangBtnRef
  );

  const onChangeLocale = (target: LocaleCode) => {
    setModal(null);
    setMobileMenuOpen(false);
    if (target === currentLocale) return;
    router.replace(switchLocaleInPath(pathname, target));
  };

  useEffect(() => {
    const handler = () => setModal("language");
    window.addEventListener("open-language-modal", handler);
    return () => window.removeEventListener("open-language-modal", handler);
  }, []);

  // Lock page scroll while a modal is open.
  useEffect(() => {
    if (!modal) return;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0)
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [modal]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1440px] h-14 lg:h-16 px-4 lg:px-6 flex items-stretch justify-between gap-4 min-w-0">
          <div className="flex items-stretch gap-5 xl:gap-8 min-w-0">
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={withLocale(currentLocale, "/")}
                className="flex items-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1]"
              >
                <img
                  src="/geomatic-logo.png"
                  alt={data.home}
                  width={200}
                  height={90}
                  className="h-11 lg:h-12 w-auto"
                />
              </Link>
              {/* Esri badge from xl up so the five menu labels always fit on one line at 1024px */}
              <span className="hidden xl:block h-7 w-px bg-slate-200" aria-hidden />
              <img
                src="/esri-official-distributor.png"
                alt={getCommon(currentLocale).esriDistributor}
                width={483}
                height={104}
                className="hidden xl:block h-7 w-auto"
              />
            </div>

            <ul className="hidden lg:flex h-full items-stretch min-w-0">
              {menuKeys.map((key) => (
                <HeaderItem
                  key={String(key)}
                  label={menus[key].label}
                  sectionsRaw={menus[key].sections}
                  currentLocale={currentLocale}
                  pathname={pathname}
                />
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-1">
            {/* Mobile menu button - only visible on smaller screens */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className={headerIconBtn}
                aria-label={data.openMenu}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                title={data.openMenu}
              >
                <RiMenuLine className="h-5 w-5 text-gray-700" aria-hidden />
              </button>
            </div>

            <div className="hidden lg:block">
              <button
                type="button"
                onClick={() => setModal("search")}
                className={headerIconBtn}
                aria-label={data.search}
                aria-haspopup="dialog"
                title={data.search}
              >
                <RiSearchLine className="h-5 w-5 text-gray-700" aria-hidden />
              </button>
            </div>

            <div className="hidden lg:block">
              <button
                type="button"
                onClick={() => setModal("language")}
                className={headerIconBtn}
                aria-label={data.chooseLanguage}
                aria-haspopup="dialog"
                title={data.chooseLanguage}
              >
                <RiGlobalLine className="h-5 w-5 text-gray-700" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => {
          setMobileMenuOpen(false);
          setModal("search");
        }}
        menus={menus}
        currentLocale={currentLocale}
        data={data}
        onChangeLocale={onChangeLocale}
      />

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-4 sm:pt-[12vh]"
          onClick={closeModal}
        >
          {/* Search and language share the same shell: rounded panel, header row, list, keyboard legend */}
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="header-modal-title"
            className={[
              "flex max-h-[calc(100dvh-1.5rem)] w-full flex-col overflow-hidden rounded-lg bg-white shadow-2xl ring-1 ring-slate-900/10 motion-safe:animate-menu-in sm:max-h-[min(36rem,76vh)]",
              modal === "search" ? "max-w-2xl" : "max-w-md",
            ].join(" ")}
            onClick={(e) => e.stopPropagation()}
          >
            {modal === "search" ? (
              <>
                <h2 id="header-modal-title" className="sr-only">
                  {data.search}
                </h2>
                <SearchPanel
                  data={data}
                  index={searchIndex}
                  currentLocale={currentLocale}
                  inputRef={searchInputRef}
                  onNavigate={closeModal}
                  onClose={closeModal}
                />
              </>
            ) : (
              <>
                <div className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 pl-4 pr-2 sm:h-16 sm:pl-5 sm:pr-3">
                  <RiGlobalLine className="h-5 w-5 shrink-0 text-[#0079c1]" aria-hidden />
                  <h2
                    id="header-modal-title"
                    className="min-w-0 flex-1 truncate text-[17px] font-semibold text-slate-900 sm:text-[18px]"
                  >
                    {data.chooseLanguage}
                  </h2>
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label={data.close}
                    title={data.close}
                    className={headerIconBtn + " shrink-0"}
                  >
                    <RiCloseLine className="h-5 w-5" aria-hidden />
                  </button>
                </div>

                <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto p-2">
                  {LANGUAGES.map((l) => {
                    const isCurrent = currentLocale === l.code;
                    return (
                      <li key={l.code}>
                        <button
                          type="button"
                          lang={l.lang}
                          ref={isCurrent ? currentLangBtnRef : undefined}
                          aria-current={isCurrent ? "true" : undefined}
                          className={[
                            "group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0079c1]",
                            isCurrent ? "bg-sky-50" : "hover:bg-slate-50",
                          ].join(" ")}
                          onClick={() => onChangeLocale(l.code)}
                        >
                          <span
                            className={[
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-[12px] font-semibold uppercase tracking-wide transition-colors",
                              isCurrent
                                ? "border-[#0079c1] bg-[#0079c1] text-white"
                                : "border-slate-200 bg-white text-slate-600 group-hover:border-slate-300",
                            ].join(" ")}
                            aria-hidden
                          >
                            {l.lang}
                          </span>
                          <span
                            className={[
                              "min-w-0 flex-1 text-[15px]",
                              isCurrent ? "font-semibold text-slate-900" : "font-medium text-slate-800",
                            ].join(" ")}
                          >
                            {l.label}
                          </span>
                          {isCurrent && (
                            <RiCheckLine className="h-5 w-5 shrink-0 text-[#0079c1]" aria-hidden />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <p className="sr-only">{data.escHint}</p>
                <div
                  className="hidden shrink-0 items-center justify-end gap-1.5 border-t border-slate-200 bg-slate-50 px-5 py-2.5 text-[13px] text-slate-600 sm:flex"
                  aria-hidden
                >
                  <kbd className={kbd}>{data.kbdEsc}</kbd>
                  {data.kbdClose}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
