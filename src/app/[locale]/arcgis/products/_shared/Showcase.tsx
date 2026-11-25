"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { RiArrowRightUpLine } from "react-icons/ri";
import { useCommon } from "@/i18n/useCommon";
import { emph } from "./text";

export type ShowcaseItem = {
  /** label of the tab */
  title: string;
  /** title shown in the panel, when it differs from the label of the tab */
  heading?: string;
  description: string;
  bullets?: string[];
  mainImage: string;
  avatarImage?: string;
  /** optional link to a live example, on another site */
  href?: string;
  linkText?: string;
};

/**
 * Capabilities as tabs: the list on the left, the picture and text of the chosen one on the right.
 * Keyboard: arrow keys move between tabs, Home/End go to the first/last (WAI-ARIA tabs pattern).
 */
export default function Showcase({ items, label }: { items: ShowcaseItem[]; label: string }) {
  const common = useCommon();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = items[active] ?? items[0];

  // on phones the tabs scroll sideways: keep the chosen one in view (not on first display)
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    tabs.current[active]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = items.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {items.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`showcase-tab-${i}`}
              aria-selected={on}
              aria-controls="showcase-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={[
                "flex shrink-0 items-center gap-3 rounded-md border px-4 py-3 text-left text-[15px] font-semibold transition-colors lg:shrink",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2",
                on
                  ? "border-[#0079c1] bg-[#0079c1]/[0.08] text-[#005e95]"
                  : "border-slate-200 bg-white text-slate-800 hover:border-slate-400",
              ].join(" ")}
            >
              {it.avatarImage && (
                <Image src={it.avatarImage} alt="" width={36} height={36} className="h-9 w-9 shrink-0 rounded object-cover" />
              )}
              <span className="whitespace-nowrap lg:whitespace-normal">{it.title}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="showcase-panel"
        aria-labelledby={`showcase-tab-${active}`}
        tabIndex={0}
        className="overflow-hidden rounded-lg border border-slate-200 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[16/9] bg-[#07131f]">
          <Image
            key={current.mainImage}
            src={current.mainImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            // animated pictures are served as they are
            unoptimized={current.mainImage.endsWith(".gif")}
            className="object-cover"
          />
        </div>
        <div className="p-6 sm:p-7">
          <h3 className="text-[22px] font-semibold leading-snug text-slate-900">{current.heading ?? current.title}</h3>
          <p className="mt-2 text-[16px] leading-relaxed text-slate-700">{current.description}</p>
          {current.bullets && current.bullets.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {current.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[15px] leading-snug text-slate-800">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0079c1]" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {current.href && /^https?:/.test(current.href) && current.linkText && (
            <a
              href={current.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2"
            >
              <span>{emph(current.linkText)}</span>
              <RiArrowRightUpLine className="h-4 w-4 shrink-0" aria-hidden />
              <span className="sr-only"> {common.opensInNewTab}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
