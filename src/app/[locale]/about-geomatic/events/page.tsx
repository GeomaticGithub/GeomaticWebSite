import { RiArrowRightUpLine, RiLinkedinBoxFill } from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { ProductHero, SectionHead, container, focusRing } from "@/app/[locale]/arcgis/products/_shared/blocks";
import { getCommon } from "@/i18n/common";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/about-geomatic/events");

interface PageProps {
  params: Promise<{ locale: string }>;
}

type Messages = {
  hero: { title: string; subtitle?: string; text?: string; bgImage?: string };
  ui: Record<string, string>;
  /** Geomatic's own events: each one links to its LinkedIn post */
  geomatic: { title: string; year: string; link: string }[];
  /** Esri's events, on esri.com */
  esri: { title: string; link: string }[];
  searchLink: string;
};

const cardHover = `transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}`;

// Events: Geomatic's own first, then Esri's conferences. To add one, add an entry to the content file.
export default async function Page(props: PageProps) {
  const { locale } = await props.params;
  const isFr = locale?.toLowerCase().startsWith("fr");
  const t = (
    isFr
      ? (await import("@/messages/fr/about-geomatic/events/index.json")).default
      : (await import("@/messages/en/about-geomatic/events/index.json")).default
  ) as unknown as Messages;
  const cta = isFr
    ? (await import("@/messages/fr/home.json")).default.home.contactCta
    : (await import("@/messages/en/home.json")).default.home.contactCta;
  const common = getCommon(locale);
  const ui = t.ui;

  return (
    <>
      <ProductHero
        dark
        kicker={ui.kicker}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        text={t.hero.text}
        bgImage={t.hero.bgImage}
        contactLabel={ui.contact}
        anchorLabel={ui.anchor}
        anchor="evenements"
        locale={locale}
      />

      {/* Geomatic's events */}
      <section id="evenements" className="scroll-mt-16 bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.geomaticKicker} title={ui.geomaticTitle} text={ui.geomaticText} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {t.geomatic.map((e) => (
              <li key={e.link}>
                <a
                  href={e.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex h-full items-start gap-5 rounded-lg border border-slate-200 bg-white p-6 ${cardHover}`}
                >
                  <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-md bg-[#0079c1] text-[17px] font-bold tabular-nums text-white">
                    {e.year}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col self-stretch">
                    <span className="text-[20px] font-semibold leading-snug text-slate-900 group-hover:text-[#005e95]">{e.title}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                      <RiLinkedinBoxFill className="h-5 w-5 shrink-0" aria-hidden />
                      {ui.linkedin}
                      <RiArrowRightUpLine className="h-4 w-4 shrink-0" aria-hidden />
                      <span className="sr-only"> {common.opensInNewTab}</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Esri's conferences and summits */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.esriKicker} title={ui.esriTitle} text={ui.esriText} />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.esri.map((e) => (
              <li key={e.link}>
                <a
                  href={e.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex h-full min-h-[64px] items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-5 py-4 ${cardHover}`}
                >
                  <span className="text-[16px] font-medium leading-snug text-slate-900 group-hover:text-[#005e95]">{e.title}</span>
                  <RiArrowRightUpLine className="h-4 w-4 shrink-0 text-[#0079c1]" aria-hidden />
                  <span className="sr-only"> {common.opensInNewTab}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={t.searchLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-10 inline-flex min-h-[48px] items-center gap-2 border border-slate-500 bg-white px-6 text-[15px] font-semibold text-slate-900 transition-colors hover:bg-slate-100 ${focusRing}`}
          >
            {ui.search}
            <RiArrowRightUpLine className="h-4 w-4" aria-hidden />
            <span className="sr-only"> {common.opensInNewTab}</span>
          </a>
        </div>
      </section>

      <ContactCta data={cta} locale={locale} />
    </>
  );
}
