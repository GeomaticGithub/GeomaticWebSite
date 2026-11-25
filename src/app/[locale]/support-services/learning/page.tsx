import Link from "next/link";
import { RiArrowRightLine, RiFileList3Line } from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { ProductHero, SectionHead, container, focusRing } from "@/app/[locale]/arcgis/products/_shared/blocks";
import ExploreCards, { type ExploreCard } from "./_components/ExploreCards";
import type { AssetPageT } from "./constants";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/support-services/learning");

interface PageProps {
  params: Promise<{ locale: string }>;
}

type Ui = Record<string, string>;

/** Number of course titles shown as a preview of the catalogue. */
const PREVIEW = 8;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const locale = params.locale;
  const isFr = locale?.toLowerCase().startsWith("fr");
  const t = (
    isFr
      ? (await import("@/messages/fr/support-services/learning/index.json")).default
      : (await import("@/messages/en/support-services/learning/index.json")).default
  ) as unknown as AssetPageT & { ui: Ui };
  const courses = (
    isFr
      ? (await import("@/messages/fr/support-services/learning/courses/index.json")).default
      : (await import("@/messages/en/support-services/learning/courses/index.json")).default
  ).community.cards;
  const cta = isFr
    ? (await import("@/messages/fr/home.json")).default.home.contactCta
    : (await import("@/messages/en/home.json")).default.home.contactCta;
  const ui = t.ui;
  const count = (s: string, n: number) => s.replace("{count}", String(n));

  return (
    <>
      <ProductHero
        kicker={ui.kicker}
        title={t.hero.title}
        subtitle={t.intro.title}
        text={t.intro.paragraph}
        bgImage={t.hero.bgGraphic}
        contactLabel={ui.contact}
        anchorLabel={ui.anchor}
        anchor="explorer"
        locale={locale}
      />

      {/* Courses, schedule, quote */}
      <section id="explorer" className="scroll-mt-16 bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={t.community.title} title={ui.exploreTitle} />
          <ExploreCards cards={t.community.cards as ExploreCard[]} locale={locale} courseCount={courses.length} />
        </div>
      </section>

      {/* A preview of the catalogue: the first course titles, then the link to all of them */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.catalogKicker} title={count(ui.catalogTitle, courses.length)} text={ui.catalogText} />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {courses.slice(0, PREVIEW).map((c) => (
              <li key={c.link} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-4">
                <RiFileList3Line className="mt-0.5 h-5 w-5 shrink-0 text-[#0079c1]" aria-hidden />
                <span className="text-[15px] font-semibold leading-snug text-slate-900">{c.title}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href={`/${locale}/support-services/learning/courses`}
              className={`group inline-flex items-center justify-center gap-2 bg-[#0079c1] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#005e95] ${focusRing}`}
            >
              {ui.catalogCta}
              <RiArrowRightLine className="h-5 w-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
            </Link>
            {courses.length > PREVIEW && <p className="text-[15px] text-slate-700">{count(ui.catalogMore, courses.length - PREVIEW)}</p>}
          </div>
        </div>
      </section>

      <ContactCta data={cta} locale={locale} />
    </>
  );
}
