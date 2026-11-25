"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiCloseLine,
  RiSearchLine,
  RiArrowDownSLine,
  RiGlobalLine,
  RiArrowRightLine,
} from "react-icons/ri";
import type { NavMessages } from "./types";
import type { Menus } from "./buildMenus";
import {
  normalizeSections,
  withLocale,
  LANGUAGES,
  type LocaleCode,
} from "./utils";
import { useDialog } from "./useDialog";

type MenuKey = keyof Menus;

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  menus: Menus;
  currentLocale: string;
  data: NavMessages;
  onChangeLocale: (lng: LocaleCode) => void;
}

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1]";

export default function MobileMenu({
  open,
  onClose,
  onOpenSearch,
  menus,
  currentLocale,
  data,
  onChangeLocale,
}: MobileMenuProps) {
  const pathname = usePathname() ?? "/";
  const panelRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Menu (and its sections) that contains the current page.
  const currentKey = useMemo(
    () =>
      (Object.keys(menus) as MenuKey[]).find((key) =>
        normalizeSections(menus[key].sections).some((sec) =>
          sec.links.some((l) => withLocale(currentLocale, l.href) === pathname)
        )
      ),
    [menus, currentLocale, pathname]
  );

  const [expanded, setExpanded] = useState<MenuKey | null>(null);

  // On open, unfold the menu of the current page so users see where they are.
  useEffect(() => {
    if (open) setExpanded(currentKey ?? null);
  }, [open, currentKey]);

  // Escape to close, focus trap, focus to the close button on open and back to the burger on close.
  useDialog(open, panelRef, onClose, closeBtnRef);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const toggle = (key: MenuKey) =>
    setExpanded((cur) => (cur === key ? null : key));

  return (
    <>
      {/* Backdrop (visible on tablets where the panel does not cover the full width) */}
      <div
        aria-hidden
        className={`fixed inset-0 z-40 bg-slate-950/50 transition-opacity duration-200 motion-reduce:transition-none ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel: full screen on phones, 420px drawer from sm.
          `invisible` when closed removes it from the tab order and from screen readers. */}
      <aside
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={data.menu}
        className={`fixed inset-y-0 right-0 z-50 flex w-full sm:max-w-[420px] flex-col bg-white shadow-2xl
                    transition-[transform,visibility] duration-300 ease-out motion-reduce:transition-none ${
                      open ? "translate-x-0 visible" : "translate-x-full invisible"
                    }`}
      >
        {/* Top bar, same height as the site header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 px-4">
          <Link
            href={`/${currentLocale}`}
            onClick={onClose}
            className={`flex items-center rounded ${focusRing}`}
          >
            <img
              src="/geomatic-logo.png"
              alt={data.home}
              width={200}
              height={90}
              className="h-11 w-auto"
            />
          </Link>
          <button
            ref={closeBtnRef}
            type="button"
            aria-label={data.closeMenu}
            onClick={onClose}
            className={`-mr-1.5 flex h-11 w-11 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 ${focusRing}`}
          >
            <RiCloseLine className="h-6 w-6" aria-hidden />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Search, styled as a field so it reads as "type here" */}
          <div className="px-4 pt-4 pb-2">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-haspopup="dialog"
              className={`flex h-12 w-full items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 text-left text-[16px] text-slate-500 transition-colors hover:border-slate-300 hover:bg-white ${focusRing}`}
            >
              <RiSearchLine className="h-5 w-5 text-slate-600" aria-hidden />
              <span>{data.searchPlaceholder}</span>
            </button>
          </div>

          <nav aria-label={data.menu}>
            <ul className="px-2">
              {(Object.keys(menus) as MenuKey[]).map((key) => {
                const entry = menus[key];
                const isOpen = expanded === key;
                const sections = normalizeSections(entry.sections);
                return (
                  <li key={key} className="border-b border-slate-100 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      aria-expanded={isOpen}
                      aria-controls={`mobile-section-${key}`}
                      className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-4 text-left text-[17px] font-semibold transition-colors ${focusRing} ${
                        isOpen || currentKey === key ? "text-[#0079c1]" : "text-slate-900"
                      }`}
                    >
                      <span>{entry.label}</span>
                      <RiArrowDownSLine
                        aria-hidden
                        className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 motion-reduce:transition-none ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Smooth height animation (grid rows 0fr → 1fr); `invisible` keeps closed links out of the tab order */}
                    <div
                      id={`mobile-section-${key}`}
                      className={`grid transition-[grid-template-rows,visibility] duration-200 ease-out motion-reduce:transition-none ${
                        isOpen ? "grid-rows-[1fr] visible" : "grid-rows-[0fr] invisible"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-4 pl-3 pr-1">
                          {sections.map((sec, i) => (
                            <div key={i} className={i > 0 ? "mt-4" : ""}>
                              {sec.heading && (
                                <p className="px-3 pb-1.5 text-[13px] font-semibold text-slate-500">
                                  {sec.heading}
                                </p>
                              )}
                              <ul className="ml-3 border-l border-slate-200">
                                {sec.links.map((lnk) => {
                                  const href = withLocale(currentLocale, lnk.href);
                                  const here = href === pathname;
                                  return (
                                    <li key={`${lnk.href}|${lnk.label}`}>
                                      <Link
                                        href={href}
                                        onClick={onClose}
                                        aria-current={here ? "page" : undefined}
                                        className={`-ml-px block border-l-2 py-2.5 pl-4 pr-3 text-[16px] leading-snug transition-colors ${focusRing} ${
                                          here
                                            ? "border-[#0079c1] bg-sky-50 font-semibold text-[#0079c1]"
                                            : "border-transparent text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                                        }`}
                                      >
                                        {lnk.label}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Footer: main call to action + language, always reachable */}
        <div className="shrink-0 space-y-4 border-t border-slate-200 bg-white px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Link
            href={withLocale(currentLocale, "/about-geomatic/contact")}
            onClick={onClose}
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#0079c1] text-[16px] font-semibold text-white transition-colors hover:bg-[#005e95] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0079c1]`}
          >
            {data.links.contactUs}
            <RiArrowRightLine className="h-5 w-5" aria-hidden />
          </Link>

          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-[14px] font-medium text-slate-600">
              <RiGlobalLine className="h-5 w-5" aria-hidden />
              {data.chooseLanguage}
            </span>
            {/* Segmented control */}
            <div
              role="group"
              aria-label={data.chooseLanguage}
              className="flex rounded-lg bg-slate-100 p-1"
            >
              {LANGUAGES.map((l) => {
                const isCurrent = currentLocale === l.code;
                return (
                  <button
                    key={l.code}
                    type="button"
                    lang={l.lang}
                    aria-current={isCurrent ? "true" : undefined}
                    onClick={() => onChangeLocale(l.code)}
                    className={`min-h-[40px] rounded-md px-3.5 text-[14px] font-semibold transition-colors ${focusRing} ${
                      isCurrent
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
