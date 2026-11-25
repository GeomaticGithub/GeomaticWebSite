import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  RiArrowRightLine,
  RiCheckLine,
  RiCustomerService2Line,
  RiGraduationCapLine,
  RiLightbulbFlashLine,
} from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { ProductHero, SectionHead, container } from "@/app/[locale]/arcgis/products/_shared/blocks";
import type { ServicesPageT } from "./constants";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/support-services");

interface PageProps {
  params: Promise<{ locale: string }>;
}

const ICONS: Record<ServicesPageT["services"][number]["key"], IconType> = {
  support: RiCustomerService2Line,
  learning: RiGraduationCapLine,
  consulting: RiLightbulbFlashLine,
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const locale = params.locale;
  const isFr = locale?.toLowerCase().startsWith("fr");
  const t = (
    isFr
      ? (await import("@/messages/fr/support-services/index.json")).default
      : (await import("@/messages/en/support-services/index.json")).default
  ) as unknown as ServicesPageT;
  const courses = isFr
    ? (await import("@/messages/fr/support-services/learning/courses/index.json")).default
    : (await import("@/messages/en/support-services/learning/courses/index.json")).default;
  const cta = isFr
    ? (await import("@/messages/fr/home.json")).default.home.contactCta
    : (await import("@/messages/en/home.json")).default.home.contactCta;
  const ui = t.ui;
  const courseCount = String(courses.community.cards.length);

  return (
    <>
      <ProductHero
        kicker={ui.kicker}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        text={t.hero.text}
        bgImage={t.hero.bgGraphic}
        image={t.hero.image}
        contactLabel={ui.contact}
        anchorLabel={ui.anchor}
        anchor="services"
        locale={locale}
      />

      {/* The three services */}
      <section id="services" className="scroll-mt-16 bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.servicesKicker} title={ui.servicesTitle} text={ui.servicesText} />
          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {t.services.map((s) => {
              const Icon = ICONS[s.key];
              return (
                // the whole card is clickable: the link of the title is stretched over it
                <li
                  key={s.key}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-[#0079c1] has-[a:focus-visible]:ring-offset-2"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#07131f]">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 460px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07131f]/60 to-transparent" aria-hidden />
                    <span className="absolute bottom-4 left-5 flex h-12 w-12 items-center justify-center rounded-md bg-[#0079c1] text-white shadow-lg">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-[22px] font-semibold leading-snug text-slate-900">
                      <Link href={`/${locale}${s.link}`} className="after:absolute after:inset-0 focus:outline-none">
                        {s.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{s.desc}</p>
                    <ul className="mt-5 space-y-2.5 border-t border-slate-200 pt-5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[15px] leading-snug text-slate-800">
                          <RiCheckLine className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#0079c1]" aria-hidden />
                          {p.replace("{count}", courseCount)}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]" aria-hidden>
                      {s.cta}
                      <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* From the visitor's situation to the right service */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className={`${container} grid gap-10 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-24`}>
          <SectionHead kicker={ui.needsKicker} title={ui.needsTitle} text={ui.needsText} />
          <ul className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            {t.needs.map((n, i) => (
              <li key={n.need} className={i ? "border-t border-slate-200" : ""}>
                <Link
                  href={`/${locale}${n.link}`}
                  className={`group flex flex-col gap-2 px-5 py-5 transition-colors hover:bg-[#0079c1]/[0.05] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0079c1]`}
                >
                  <span className="text-[17px] font-semibold leading-snug text-slate-900">{n.need}</span>
                  <span className="inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                    {n.answer}
                    <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
                  </span>
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
