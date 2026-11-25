// The common layout of the eleven sector pages:
// banner → uses → sub-sectors → customer story → resources → other sectors → contact.
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine } from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { ProductHero, SectionHead, container, focusRing } from "@/app/[locale]/arcgis/products/_shared/blocks";
import { getCommon } from "@/i18n/common";
import { SECTORS } from "../catalog";
import { loadSector } from "./sector";
import StoryBand from "./StoryBand";

type Ui = Record<string, string>;

/** Link to another site: label, arrow and the note for screen readers. */
function Out({ href, label, note, className = "" }: { href: string; label: string; note: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing} ${className}`}
    >
      {label}
      <RiArrowRightUpLine className="h-4 w-4 shrink-0" aria-hidden />
      <span className="sr-only"> {note}</span>
    </a>
  );
}

export default async function SectorPage({ slug, locale }: { slug: string; locale: string }) {
  const lang = locale?.toLowerCase().startsWith("fr") ? "fr" : "en";
  const ui = (await import(`@/messages/${lang}/industries/sector-ui.json`)).default as Ui;
  const home = (await import(`@/messages/${lang}/home.json`)).default;
  const labels = home.nav.links as Record<string, string>;
  const common = getCommon(locale);
  const entry = SECTORS.find((s) => s.slug === slug);
  if (!entry) throw new Error(`Unknown sector: ${slug}`);
  const name = labels[entry.key];
  const t = await loadSector(slug, lang);
  const hasUses = t.features.length > 0;
  // the second button of the banner leads to the first block of the page
  const first = hasUses ? { id: "usages", label: ui.anchor } : t.segments.length ? { id: "domaines", label: ui.segmentsAnchor } : undefined;

  return (
    <>
      <ProductHero
        dark
        kicker={ui.kicker}
        title={name}
        subtitle={t.subtitle}
        text={t.text}
        bgImage={t.bg}
        contactLabel={ui.contact}
        anchorLabel={first?.label}
        anchor={first?.id}
        locale={locale}
      />

      {/* What ArcGIS brings: one row per use, picture and text alternating */}
      {hasUses && (
        <section id="usages" className="scroll-mt-16 bg-white">
          <div className={`${container} py-16 lg:py-24`}>
            <SectionHead kicker={ui.usagesKicker} title={ui.usagesTitle} />
            <div className="mt-10 space-y-10 lg:space-y-12">
              {t.features.map((f, i) => (
                <article key={f.title} className={`grid items-center gap-6 lg:gap-14 ${i % 2 ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"}`}>
                  {f.image && (
                    <div className={`relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-100 ${i % 2 ? "lg:order-last" : ""}`}>
                      {f.bg && <Image src={f.bg} alt="" fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />}
                      <Image src={f.image} alt="" fill sizes="(min-width: 1024px) 700px, 100vw" className="object-contain p-5 sm:p-8" />
                    </div>
                  )}
                  <div className={f.image ? "" : "max-w-3xl lg:col-span-2"}>
                    <p className="text-[14px] font-semibold tabular-nums text-[#0079c1]" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-[24px] font-bold leading-tight text-slate-900 sm:text-[28px]">{f.title}</h3>
                    <p className="mt-3 text-[17px] leading-relaxed text-slate-700">{f.text}</p>
                    {f.href && <Out href={f.href} label={f.linkLabel ?? common.learnMore} note={common.opensInNewTab} className="mt-5" />}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sub-sectors */}
      {t.segments.map((group, g) => {
        const cols = group.items.length === 5 ? "lg:grid-cols-3 xl:grid-cols-5" : group.items.length >= 4 ? "lg:grid-cols-4" : group.items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
        return (
          <section
            key={group.title ?? g}
            id={g === 0 ? "domaines" : undefined}
            className={`scroll-mt-16 border-t border-slate-200 ${g % 2 ? "bg-white" : "bg-slate-50"}`}
          >
            <div className={`${container} py-16 lg:py-24`}>
              <SectionHead kicker={ui.segmentsKicker} title={group.title ?? ui.segmentsTitle} text={group.text} />
              <ul className={`mt-10 grid gap-5 sm:grid-cols-2 ${cols}`}>
                {group.items.map((it) => (
                  <li key={it.title} className="flex flex-col rounded-lg border border-slate-200 bg-white p-6">
                    {it.icon && (
                      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-md bg-[#0079c1]/10">
                        <Image src={it.icon} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
                      </span>
                    )}
                    <h3 className="text-[19px] font-semibold leading-snug text-slate-900">{it.title}</h3>
                    {it.text && <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{it.text}</p>}
                    {it.href && (
                      <span className="mt-auto pt-5">
                        <Out href={it.href} label={it.linkLabel ?? common.learnMore} note={`${it.title} ${common.opensInNewTab}`} />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      {t.story && <StoryBand story={t.story} kicker={t.story.text ? ui.storyKicker : ui.videoKicker} readLabel={ui.readDoc} />}

      {t.resources && (
        <section className="bg-white">
          <div className={`${container} py-16 lg:py-24`}>
            <SectionHead kicker={ui.resourcesKicker} title={t.resources.title ?? ui.resourcesKicker} text={t.resources.text} />
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {t.resources.items.map((r) => {
                const body = (
                  <>
                    {r.image && (
                      <span className="relative block aspect-[16/9] bg-slate-100">
                        <Image src={r.image} alt="" fill sizes="(min-width: 1024px) 340px, 50vw" className="object-cover" />
                      </span>
                    )}
                    <span className="flex flex-1 flex-col p-5">
                      <span className="flex items-start justify-between gap-2 text-[18px] font-semibold leading-snug text-slate-900 group-hover:text-[#005e95]">
                        {r.title}
                        {r.href && <RiArrowRightUpLine className="mt-1 h-4 w-4 shrink-0 text-[#0079c1]" aria-hidden />}
                      </span>
                      {r.text && <span className="mt-2 block text-[15px] leading-relaxed text-slate-700">{r.text}</span>}
                      {r.href && <span className="sr-only"> {common.opensInNewTab}</span>}
                    </span>
                  </>
                );
                const box = "group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white";
                return (
                  <li key={r.title}>
                    {r.href ? (
                      <a
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${box} transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}`}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={box}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* The other sectors, and the way back to the overview */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className={`${container} py-12 lg:py-14`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[22px] font-bold text-slate-900">{ui.othersTitle}</h2>
            <Link
              href={`/${locale}/industries`}
              className={`group inline-flex items-center gap-2 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
            >
              {ui.allLink}
              <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {SECTORS.filter((s) => s.slug !== slug).map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.key}>
                  <Link
                    href={`/${locale}${s.href}`}
                    className={`inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-[15px] font-medium text-slate-800 transition-colors hover:border-[#0079c1] hover:text-[#005e95] ${focusRing}`}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[#0079c1]" aria-hidden />
                    {labels[s.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ContactCta data={home.home.contactCta} locale={locale} />
    </>
  );
}
