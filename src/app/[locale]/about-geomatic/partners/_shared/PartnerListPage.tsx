// The common layout of the three partner family pages (technology, solutions, imagery):
// banner → the partners of the family → the two other families → contact.
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { getCommon } from "@/i18n/common";
import { Hero } from "../_components";
import PartnerCard from "../_components/PartnerCard";
import type { PartnerListT, PartnersPageT } from "../constants";

const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2";
const container = "mx-auto max-w-[1440px] px-4 lg:px-6";

export type PartnerFamily = "technology" | "solutions" | "imagery";

export default async function PartnerListPage({ family, locale }: { family: PartnerFamily; locale: string }) {
  const lang = locale?.toLowerCase().startsWith("fr") ? "fr" : "en";
  const index = (await import(`@/messages/${lang}/about-geomatic/partners/index.json`)).default as unknown as PartnersPageT;
  const t = (await import(`@/messages/${lang}/about-geomatic/partners/${family}/index.json`)).default as unknown as PartnerListT;
  const cta = (await import(`@/messages/${lang}/home.json`)).default.home.contactCta;
  const common = getCommon(locale);
  const ui = index.ui;
  const partners = t.community.cards;
  const others = index.categories.filter((c) => c.key !== family);

  return (
    <>
      <Hero
        data={{
          kicker: ui.kicker,
          title: t.hero.title,
          lead: t.intro.subTitle ?? "",
          description: t.intro.paragraph ?? "",
          bgGraphic: t.hero.bgGraphic,
        }}
      />

      <section aria-labelledby="partners-list" className="bg-white">
        <div className={`${container} py-14 lg:py-20`}>
          <h2 id="partners-list" className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#005e95]">
            {partners.length === 1 ? ui.countOne : ui.count.replace("{count}", String(partners.length))}
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p) => (
              <PartnerCard key={p.title} partner={p} locale={locale} siteLabel={ui.site} solutionLabel={ui.solution} newTabNote={common.opensInNewTab} />
            ))}
          </ul>
        </div>
      </section>

      {/* The two other families, and the way back to the overview */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className={`${container} py-12 lg:py-14`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[22px] font-bold text-slate-900">{ui.others}</h2>
            <Link
              href={`/${locale}/about-geomatic/partners`}
              className={`group inline-flex items-center gap-2 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
            >
              {ui.allPartners}
              <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((c) => (
              <li key={c.key}>
                <Link
                  href={`/${locale}${c.link}`}
                  className={`group flex h-full items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}`}
                >
                  <span className="text-[18px] font-semibold leading-snug text-slate-900 group-hover:text-[#005e95]">{c.title}</span>
                  <RiArrowRightLine className="h-5 w-5 shrink-0 text-[#0079c1] transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta data={cta} locale={locale} />
    </>
  );
}
