// Building blocks shared by the ArcGIS product pages (hero, section titles, steps, stories, link tiles).
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiArrowDownLine, RiArrowRightLine, RiArrowRightUpLine } from "react-icons/ri";
import { getCommon } from "@/i18n/common";
import { resolveLink } from "./links";

export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2";
const focusRingDark =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07131f]";
export const container = "mx-auto max-w-[1440px] px-4 lg:px-6";

export function Kicker({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] ${dark ? "text-sky-300" : "text-[#005e95]"}`}>
      <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHead({
  kicker,
  title,
  text,
  dark,
  id,
}: {
  kicker: string;
  title: string;
  text?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Kicker dark={dark}>{kicker}</Kicker>
      <h2 id={id} className={`mt-4 text-[30px] font-bold leading-[1.12] sm:text-[40px] ${dark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      {text && <p className={`mt-4 text-[17px] leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>{text}</p>}
    </div>
  );
}

/** Link that follows resolveLink(): page of this site, other site in a new tab, or plain text. */
export function SmartLink({
  href,
  locale,
  className,
  children,
}: {
  href?: string;
  locale: string;
  className?: string;
  children: ReactNode;
}) {
  const r = resolveLink(href, locale);
  if (!r.href) return <span className={className}>{children}</span>;
  if (r.external) {
    return (
      <a href={r.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={r.href} className={className}>
      {children}
    </Link>
  );
}

/** Arrow shown after a link label: right arrow for this site, up-right arrow (+ screen-reader note) for another site. */
export function LinkArrow({ href, locale }: { href?: string; locale: string }) {
  const r = resolveLink(href, locale);
  if (!r.href) return null;
  if (r.external) {
    return (
      <>
        <RiArrowRightUpLine className="h-4 w-4 shrink-0" aria-hidden />
        <span className="sr-only"> {getCommon(locale).opensInNewTab}</span>
      </>
    );
  }
  return <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />;
}

export function ProductHero({
  kicker,
  icon,
  title,
  subtitle,
  text,
  bgImage,
  image,
  imageAlt,
  dark,
  contactLabel,
  anchorLabel,
  anchor,
  locale,
}: {
  kicker: string;
  icon?: string;
  title: string;
  subtitle?: string;
  text?: string;
  bgImage?: string;
  image?: string;
  imageAlt?: string;
  dark?: boolean;
  contactLabel: string;
  anchorLabel?: string;
  anchor?: string;
  locale: string;
}) {
  return (
    <section className={`relative isolate overflow-hidden ${dark ? "bg-[#07131f] text-white" : "border-b border-slate-200 bg-white text-slate-900"}`}>
      {bgImage && <Image src={bgImage} alt="" fill priority sizes="100vw" className={`-z-10 object-cover ${dark ? "opacity-60" : "opacity-70"}`} />}
      {/* on phones the text covers the whole picture, so the veil stays stronger across the full width */}
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-r ${
          dark
            ? "from-[#07131f] via-[#07131f]/80 to-[#07131f]/55 lg:via-[#07131f]/75 lg:to-[#07131f]/10"
            : "from-white via-white/90 to-white/70 lg:via-white/80 lg:to-white/20"
        }`}
        aria-hidden
      />

      <div className={`${container} grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20`}>
        <div className="max-w-xl">
          <Kicker dark={dark}>{kicker}</Kicker>
          <div className="mt-5 flex items-center gap-4">
            {icon && <Image src={icon} alt="" width={64} height={64} className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16" />}
            <h1 className="text-[38px] font-bold leading-[1.05] sm:text-[52px]">{title}</h1>
          </div>
          {subtitle && <p className={`mt-5 text-[20px] font-semibold leading-snug ${dark ? "text-white" : "text-slate-900"}`}>{subtitle}</p>}
          {text && <p className={`mt-3 text-[17px] leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>{text}</p>}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/about-geomatic/contact`}
              className={`group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold transition-colors ${
                dark ? `bg-white text-[#005e95] hover:bg-slate-100 ${focusRingDark}` : `bg-[#0079c1] text-white hover:bg-[#005e95] ${focusRing}`
              }`}
            >
              {contactLabel}
              <RiArrowRightLine className="h-5 w-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
            </Link>
            {anchor && anchorLabel && (
              <a
                href={`#${anchor}`}
                className={`inline-flex items-center justify-center gap-2 border px-6 py-3.5 text-[15px] font-semibold transition-colors ${
                  dark ? `border-white/70 text-white hover:bg-white/10 ${focusRingDark}` : `border-slate-500 bg-white/80 text-slate-900 hover:bg-white ${focusRing}`
                }`}
              >
                {anchorLabel}
                <RiArrowDownLine className="h-5 w-5" aria-hidden />
              </a>
            )}
          </div>
        </div>

        {image && (
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[640px]">
            <Image src={image} alt={imageAlt ?? ""} fill priority sizes="(min-width: 1024px) 640px, 100vw" className="object-contain" />
          </div>
        )}
      </div>
    </section>
  );
}

/** "How it works": a diagram and numbered steps. */
export function Steps({
  kicker,
  title,
  image,
  imageAlt,
  steps,
}: {
  kicker: string;
  title: string;
  image?: string;
  imageAlt?: string;
  steps: { title: string; desc: string }[];
}) {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className={`${container} py-16 lg:py-24`}>
        <SectionHead kicker={kicker} title={title} />
        {/* with a diagram: the steps beside it; without one: the steps side by side */}
        <div className={`mt-10 ${image ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-16" : ""}`}>
          {image && (
            <div className="relative aspect-[4/3] w-full">
              <Image src={image} alt={imageAlt ?? ""} fill sizes="(min-width: 1024px) 680px, 100vw" className="object-contain" />
            </div>
          )}
          <ol className={image ? "space-y-6" : `grid gap-x-10 gap-y-8 sm:grid-cols-2 ${steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {steps.map((s, i) => (
              <li key={`${i}-${s.title}`} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0079c1] text-[16px] font-bold tabular-nums text-white" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[19px] font-semibold leading-snug text-slate-900">{s.title}</h3>
                  <p className="mt-1.5 text-[16px] leading-relaxed text-slate-700">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Customer stories: thumbnail, organisation, one sentence, link to the story. */
export function StoryCards({
  kicker,
  title,
  text,
  items,
  locale,
}: {
  kicker: string;
  title: string;
  text?: string;
  items: { image?: string; title?: string; label: string; desc?: string; actionText?: string; actionUrl?: string }[];
  locale: string;
}) {
  const cols = items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <section className="bg-white">
      <div className={`${container} py-16 lg:py-24`}>
        <SectionHead kicker={kicker} title={title} text={text} />
        <ul className={`mt-10 grid gap-5 sm:grid-cols-2 ${cols}`}>
          {items.map((it) => {
            const linked = Boolean(resolveLink(it.actionUrl, locale).href);
            return (
              <li key={it.label}>
                <SmartLink
                  href={it.actionUrl}
                  locale={locale}
                  className={`group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 ${
                    linked ? `transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}` : ""
                  }`}
                >
                  {it.image && <Image src={it.image} alt="" width={64} height={64} className="h-16 w-16 rounded-md object-cover ring-1 ring-slate-200" />}
                  <span className="mt-5 block text-[19px] font-semibold leading-snug text-slate-900">{it.title ?? it.label}</span>
                  {it.desc && <span className="mt-2 block text-[15px] leading-relaxed text-slate-700">{it.desc}</span>}
                  {linked && it.actionText && (
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                      {it.actionText}
                      <LinkArrow href={it.actionUrl} locale={locale} />
                    </span>
                  )}
                </SmartLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Related products, on the dark brand colour. */
export function LinkTiles({
  kicker,
  title,
  text,
  bgImage,
  items,
  locale,
}: {
  kicker: string;
  title: string;
  text?: string;
  bgImage?: string;
  items: { title: string; desc: string; linkText: string; href?: string; icon?: string }[];
  locale: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#07131f] text-white">
      {bgImage && <Image src={bgImage} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-20" />}
      <div className={`${container} py-16 lg:py-24`}>
        <SectionHead kicker={kicker} title={title} text={text} dark />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => {
            const linked = Boolean(resolveLink(it.href, locale).href);
            return (
              <li key={it.title}>
                <SmartLink
                  href={it.href}
                  locale={locale}
                  className={`group flex h-full flex-col rounded-lg border border-white/10 bg-[#0b1d2e]/90 p-6 transition-colors duration-200 ${linked ? `hover:border-sky-400/60 ${focusRingDark}` : ""}`}
                >
                  {it.icon && <Image src={it.icon} alt="" width={48} height={48} className="mb-5 h-12 w-12 object-contain" />}
                  <span className="block text-[19px] font-semibold leading-snug">{it.title}</span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-slate-300">{it.desc}</span>
                  {linked && (
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-semibold text-sky-300 group-hover:text-sky-200">
                      {it.linkText}
                      <LinkArrow href={it.href} locale={locale} />
                    </span>
                  )}
                </SmartLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
