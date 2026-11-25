import { RiMailLine, RiPhoneLine } from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { telHref } from "@/app/[locale]/about-geomatic/contact/constants";
import { ProductHero, SectionHead, container } from "@/app/[locale]/arcgis/products/_shared/blocks";
import { Reach, reachRow } from "@/app/[locale]/support-services/_components/Reach";
import Catalogue from "./_components/Catalogue";
import type { CoursesPageT } from "./constants";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/support-services/learning/courses");

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const locale = params.locale;
  const isFr = locale?.toLowerCase().startsWith("fr");
  const t = (
    isFr
      ? (await import("@/messages/fr/support-services/learning/courses/index.json")).default
      : (await import("@/messages/en/support-services/learning/courses/index.json")).default
  ) as unknown as CoursesPageT;
  const cta = isFr
    ? (await import("@/messages/fr/home.json")).default.home.contactCta
    : (await import("@/messages/en/home.json")).default.home.contactCta;
  const ui = t.ui;
  const courses = t.community.cards;

  return (
    <>
      <ProductHero
        kicker={ui.kicker}
        title={t.hero.title}
        text={ui.heroText.replace("{count}", String(courses.length))}
        bgImage={t.hero.bgGraphic}
        contactLabel={ui.contact}
        anchorLabel={ui.anchor}
        anchor="catalogue"
        locale={locale}
      />

      <Catalogue title={t.community.title} courses={courses} ui={ui} />

      {/* Help to build a training plan, with the address and number of the training team */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className={`${container} grid gap-10 py-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:py-24`}>
          <div>
            <SectionHead kicker={ui.planKicker} title={t.intro.title} text={t.intro.subTitle} />
            <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-slate-700">{t.intro.paragraph}</p>
          </div>
          <ul className="self-center overflow-hidden rounded-lg border border-slate-200 bg-white">
            <li>
              <a href={`mailto:${t.intro.email}`} className={reachRow}>
                <Reach icon={RiMailLine} label={t.intro.emailText} value={t.intro.email} />
              </a>
            </li>
            <li className="border-t border-slate-200">
              <a href={telHref(t.intro.phone)} className={reachRow}>
                <Reach icon={RiPhoneLine} label={t.intro.phoneText} value={<span className="tabular-nums">{t.intro.phone}</span>} />
              </a>
            </li>
          </ul>
        </div>
      </section>

      <ContactCta data={cta} locale={locale} />
    </>
  );
}
