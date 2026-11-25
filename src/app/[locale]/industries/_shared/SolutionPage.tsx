// The common layout of the seven partner-solution pages:
// banner → presentation → video → partner product and brochure → how it works → pictures → other solutions → contact.
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine, RiCheckLine } from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { Kicker, ProductHero, SectionHead, container, focusRing } from "@/app/[locale]/arcgis/products/_shared/blocks";
import { getCommon } from "@/i18n/common";
import { SOLUTIONS } from "../catalog";
import { loadSolution } from "./solution";

type Ui = Record<string, string>;

/** A picture in its frame: photos fill it, screenshots and slides are shown whole on white. */
function Frame({ src, fit, ratio, sizes }: { src: string; fit: "cover" | "contain"; ratio: string; sizes: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg ${ratio} ${fit === "contain" ? "border border-slate-200 bg-white" : "bg-slate-100"}`}>
      <Image src={src} alt="" fill sizes={sizes} className={fit === "contain" ? "object-contain p-3 sm:p-5" : "object-cover"} />
    </div>
  );
}

export default async function SolutionPage({ slug, locale }: { slug: string; locale: string }) {
  const lang = locale?.toLowerCase().startsWith("fr") ? "fr" : "en";
  const ui = (await import(`@/messages/${lang}/industries/solution-ui.json`)).default as Ui;
  const home = (await import(`@/messages/${lang}/home.json`)).default;
  const labels = home.nav.links as Record<string, string>;
  const common = getCommon(locale);
  if (!SOLUTIONS.some((s) => s.slug === slug)) throw new Error(`Unknown partner solution: ${slug}`);
  const t = await loadSolution(slug, lang);
  const hasIntro = Boolean(t.lead) || t.sections.length > 0;
  // the block that precedes the list of the other solutions decides its background
  const endsOnGrey = Boolean(t.brochure) && !t.steps && t.examples.length === 0;

  return (
    <>
      <ProductHero
        dark
        kicker={ui.kicker}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        text={t.hero.text}
        bgImage={t.hero.bg}
        contactLabel={ui.contact}
        anchorLabel={ui.anchor}
        anchor="solution"
        locale={locale}
      />

      <div id="solution" className="scroll-mt-16">
        {/* Presentation: an opening paragraph, then one row per topic */}
        {hasIntro && (
          <section className="bg-white">
            <div className={`${container} py-16 lg:py-24`}>
              {t.lead && <p className="max-w-4xl text-[19px] leading-relaxed text-slate-700 sm:text-[21px]">{t.lead}</p>}
              {t.sections.length > 0 && (
                <div className={`space-y-12 lg:space-y-16 ${t.lead ? "mt-12 lg:mt-16" : ""}`}>
                  {t.sections.map((s, i) => (
                    <article key={s.title} className={`grid items-center gap-6 lg:gap-14 ${s.image ? "lg:grid-cols-2" : ""}`}>
                      {s.image && (
                        <div className={i % 2 ? "lg:order-last" : ""}>
                          <Frame src={s.image} fit={s.fit} ratio="aspect-[16/10]" sizes="(min-width: 1024px) 700px, 100vw" />
                        </div>
                      )}
                      <div className={s.image ? "" : "max-w-3xl"}>
                        <h2 className="text-[26px] font-bold leading-tight text-slate-900 sm:text-[32px]">{s.title}</h2>
                        {s.paragraphs.map((p) => (
                          <p key={p} className="mt-4 text-[17px] leading-relaxed text-slate-700">
                            {p}
                          </p>
                        ))}
                        {s.bullets.length > 0 && (
                          <ul className="mt-5 space-y-3">
                            {s.bullets.map((b) => (
                              <li key={b} className="flex items-start gap-3 text-[17px] leading-snug text-slate-800">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0079c1] text-white">
                                  <RiCheckLine className="h-3.5 w-3.5" aria-hidden />
                                </span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Video */}
        {t.video && (
          <section className="bg-[#07131f] text-white">
            <div className={`${container} grid items-center gap-8 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24`}>
              <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                <iframe
                  src={t.video.src}
                  title={t.video.title}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <SectionHead dark kicker={ui.videoKicker} title={t.video.title} text={t.video.text} />
            </div>
          </section>
        )}

        {/* The partner product, with its brochure when there is one */}
        {t.brochure && (
          <section className="border-y border-slate-200 bg-slate-50">
            <div className={`${container} grid items-center gap-8 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24`}>
              {t.brochure.image && <Frame src={t.brochure.image} fit={t.brochure.fit} ratio="aspect-[16/10]" sizes="(min-width: 1024px) 700px, 100vw" />}
              <div className={t.brochure.image ? "" : "max-w-3xl lg:col-span-2"}>
                <Kicker>{t.brochure.href ? ui.brochureKicker : ui.aboutKicker}</Kicker>
                <h2 className="mt-4 text-[28px] font-bold leading-tight text-slate-900 sm:text-[36px]">{t.brochure.title}</h2>
                <p className="mt-4 text-[17px] leading-relaxed text-slate-700">{t.brochure.text}</p>
                {t.brochure.href && (
                  <a
                    href={t.brochure.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-md bg-[#0079c1] px-6 text-[16px] font-semibold text-white transition-colors hover:bg-[#005e95] ${focusRing}`}
                  >
                    {ui.download}
                    <RiArrowRightUpLine className="h-4 w-4 shrink-0" aria-hidden />
                    <span className="sr-only"> {common.opensInNewTab}</span>
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* How the service works, step by step */}
        {t.steps && (
          <section className="bg-white">
            <div className={`${container} py-16 lg:py-24`}>
              <SectionHead kicker={ui.stepsKicker} title={t.steps.title} />
              <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {t.steps.items.map((step, i) => (
                  <li key={step.title} className="rounded-lg border border-slate-200 bg-white p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0079c1] text-[16px] font-bold tabular-nums text-white" aria-hidden>
                      {i + 1}
                    </span>
                    <h3 className="mt-5 text-[20px] font-semibold leading-snug text-slate-900">{step.title}</h3>
                    <ul className="mt-3 space-y-2">
                      {step.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[15px] leading-snug text-slate-700">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0079c1]" aria-hidden />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Slides and screenshots of the partner, with their text */}
        {t.examples.length > 0 && (
          <section className="bg-white">
            <div className={`${container} py-16 lg:py-24`}>
              <SectionHead kicker={ui.examplesKicker} title={ui.examplesTitle} />
              <ul className="mt-10 grid gap-5 md:grid-cols-2">
                {t.examples.map((e) => (
                  <li key={e.title} className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
                    <div className="relative aspect-[16/9] border-b border-slate-200 bg-white">
                      <Image src={e.image} alt="" fill sizes="(min-width: 768px) 700px, 100vw" className="object-contain p-3 sm:p-4" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-[20px] font-semibold leading-snug text-slate-900">{e.title}</h3>
                      {e.text && <p className="mt-2 text-[16px] leading-relaxed text-slate-700">{e.text}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>

      {/* The other solutions, and the way back to the overview */}
      <section className={endsOnGrey ? "bg-white" : "border-t border-slate-200 bg-slate-50"}>
        <div className={`${container} py-12 lg:py-14`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[22px] font-bold text-slate-900">{ui.othersTitle}</h2>
            <Link
              href={`/${locale}/industries#solutions`}
              className={`group inline-flex items-center gap-2 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
            >
              {ui.allLink}
              <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
            </Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {SOLUTIONS.filter((s) => s.slug !== slug).map((s) => {
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
