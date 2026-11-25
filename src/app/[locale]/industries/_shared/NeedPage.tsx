// The common layout of the eleven "business need" pages:
// banner → the challenge → benefits → ArcGIS capabilities → related needs → articles → contact.
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine, RiCheckLine } from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { Kicker, ProductHero, SectionHead, container, focusRing } from "@/app/[locale]/arcgis/products/_shared/blocks";
import { getCommon } from "@/i18n/common";
import { NEEDS } from "../catalog";
import { loadNeed } from "./need";

type Ui = Record<string, string>;

const cardHover = `transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}`;
const arrow = "h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none";

export default async function NeedPage({ slug, locale }: { slug: string; locale: string }) {
  const lang = locale?.toLowerCase().startsWith("fr") ? "fr" : "en";
  const ui = (await import(`@/messages/${lang}/industries/need-ui.json`)).default as Ui;
  const home = (await import(`@/messages/${lang}/home.json`)).default;
  const labels = home.nav.links as Record<string, string>;
  const common = getCommon(locale);
  if (!NEEDS.some((n) => n.slug === slug)) throw new Error(`Unknown business need: ${slug}`);
  const t = await loadNeed(slug, lang);
  const overview = `/${locale}/industries#besoins`;

  return (
    <>
      <ProductHero
        kicker={ui.kicker}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        text={t.hero.text}
        bgImage={t.hero.bg}
        image={t.hero.image}
        contactLabel={ui.contact}
        anchorLabel={t.benefits ? ui.anchor : undefined}
        anchor={t.benefits ? "benefices" : undefined}
        locale={locale}
      />

      {/* The challenge, in a few lines */}
      {t.intro && (
        <section className="bg-white">
          <div className={`${container} py-14 lg:py-20`}>
            <div className="max-w-4xl">
              <Kicker>{ui.introKicker}</Kicker>
              <h2 className="mt-4 text-[30px] font-bold leading-[1.12] text-slate-900 sm:text-[40px]">{t.intro.title}</h2>
              <p className="mt-5 text-[19px] leading-relaxed text-slate-700">{t.intro.text}</p>
            </div>
          </div>
        </section>
      )}

      {/* What the organisation gains */}
      {t.benefits && (
        <section id="benefices" className="scroll-mt-16 border-y border-slate-200 bg-slate-50">
          <div className={`${container} grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24`}>
            {t.benefits.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-200">
                <Image src={t.benefits.image} alt="" fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
              </div>
            )}
            <div className={t.benefits.image ? "" : "lg:col-span-2"}>
              <SectionHead kicker={ui.benefitsKicker} title={t.benefits.title} text={t.benefits.text} />
              <ul className="mt-6 space-y-3">
                {t.benefits.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[16px] leading-snug text-slate-800">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0079c1] text-white">
                      <RiCheckLine className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* The ArcGIS capabilities that answer the need */}
      {t.capabilities && (
        <section className="bg-white">
          <div className={`${container} py-16 lg:py-24`}>
            <SectionHead kicker={ui.capabilitiesKicker} title={t.capabilities.title} text={t.capabilities.text} />
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {t.capabilities.items.map((c) => {
                const body = (
                  <>
                    {c.image && (
                      <span className="relative block aspect-[16/9] bg-slate-50">
                        <Image src={c.image} alt="" fill sizes="(min-width: 768px) 460px, 100vw" className="object-contain p-4" />
                      </span>
                    )}
                    <span className="flex flex-1 flex-col border-t border-slate-200 p-6">
                      <span className="block text-[20px] font-semibold leading-snug text-slate-900 group-hover:text-[#005e95]">{c.title}</span>
                      <span className="mt-2 block text-[15px] leading-relaxed text-slate-700">{c.text}</span>
                      {c.link && (
                        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                          {c.label ?? common.learnMore}
                          {c.link.external ? (
                            <>
                              <RiArrowRightUpLine className="h-4 w-4 shrink-0" aria-hidden />
                              <span className="sr-only"> {common.opensInNewTab}</span>
                            </>
                          ) : (
                            <RiArrowRightLine className={arrow} aria-hidden />
                          )}
                        </span>
                      )}
                    </span>
                  </>
                );
                const box = "group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white";
                return (
                  <li key={c.title}>
                    {!c.link ? (
                      <div className={box}>{body}</div>
                    ) : c.link.external ? (
                      <a href={c.link.href} target="_blank" rel="noopener noreferrer" className={`${box} ${cardHover}`}>
                        {body}
                      </a>
                    ) : (
                      <Link href={`/${locale}${c.link.href}`} className={`${box} ${cardHover}`}>
                        {body}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Related needs when the content names some; otherwise the list of the other needs */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className={`${container} py-14 lg:py-20`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            {t.related ? (
              <div>
                <Kicker>{ui.relatedKicker}</Kicker>
                <h2 className="mt-4 text-[26px] font-bold leading-tight text-slate-900 sm:text-[32px]">{t.related.title}</h2>
              </div>
            ) : (
              <h2 className="text-[22px] font-bold text-slate-900">{ui.othersTitle}</h2>
            )}
            <Link
              href={overview}
              className={`group inline-flex items-center gap-2 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
            >
              {ui.allLink}
              <RiArrowRightLine className={arrow} aria-hidden />
            </Link>
          </div>

          {t.related ? (
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {t.related.items.map((r) => {
                const body = (
                  <>
                    {r.icon && (
                      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-[#0079c1]/10">
                        <Image src={r.icon} alt="" width={30} height={30} className="h-[30px] w-[30px] object-contain" />
                      </span>
                    )}
                    <span className="flex items-start justify-between gap-3 text-[19px] font-semibold leading-snug text-slate-900 group-hover:text-[#005e95]">
                      {r.title}
                      {r.href && <RiArrowRightLine className={`${arrow} mt-1 text-[#0079c1]`} aria-hidden />}
                    </span>
                    {r.text && <span className="mt-2 block text-[15px] leading-relaxed text-slate-700">{r.text}</span>}
                  </>
                );
                const box = "group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6";
                return (
                  <li key={r.title}>
                    {r.href ? (
                      <Link href={`/${locale}${r.href}`} className={`${box} ${cardHover}`}>
                        {body}
                      </Link>
                    ) : (
                      <div className={box}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="mt-6 flex flex-wrap gap-2">
              {NEEDS.filter((n) => n.slug !== slug).map((n) => {
                const Icon = n.icon;
                return (
                  <li key={n.key}>
                    <Link
                      href={`/${locale}${n.href}`}
                      className={`inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-[15px] font-medium text-slate-800 transition-colors hover:border-[#0079c1] hover:text-[#005e95] ${focusRing}`}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-[#0079c1]" aria-hidden />
                      {labels[n.key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* Articles, on the Esri site */}
      {t.articles && (
        <section className="bg-white">
          <div className={`${container} py-16 lg:py-24`}>
            <SectionHead kicker={ui.articlesKicker} title={t.articles.title} />
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {t.articles.items.map((a) => {
                const body = (
                  <>
                    {a.image && (
                      <span className="relative block aspect-[16/9] overflow-hidden bg-slate-100">
                        <Image
                          src={a.image}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 460px, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                      </span>
                    )}
                    <span className="flex flex-1 flex-col p-6">
                      <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-600">
                        {[a.tag, a.source].filter(Boolean).join(" · ")}
                      </span>
                      <span className="mt-2 flex items-start justify-between gap-3 text-[19px] font-semibold leading-snug text-slate-900 group-hover:text-[#005e95]">
                        {a.title}
                        {a.href && <RiArrowRightUpLine className="mt-1 h-4 w-4 shrink-0 text-[#0079c1]" aria-hidden />}
                      </span>
                      {a.text && <span className="mt-2 block text-[15px] leading-relaxed text-slate-700">{a.text}</span>}
                      {a.href && <span className="sr-only"> {common.opensInNewTab}</span>}
                    </span>
                  </>
                );
                const box = "group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white";
                return (
                  <li key={a.title}>
                    {a.href ? (
                      <a href={a.href} target="_blank" rel="noopener noreferrer" className={`${box} ${cardHover}`}>
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

      <ContactCta data={home.home.contactCta} locale={locale} />
    </>
  );
}
