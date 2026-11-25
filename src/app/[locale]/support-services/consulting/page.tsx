import Image from "next/image";
import type { IconType } from "react-icons";
import {
  RiBriefcaseLine,
  RiBuildingLine,
  RiLineChartLine,
  RiRocketLine,
  RiSettings3Line,
  RiTeamLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { ProductHero, SectionHead, container } from "@/app/[locale]/arcgis/products/_shared/blocks";
import type { ConsultingPageT } from "./constants";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/support-services/consulting");

interface PageProps {
  params: Promise<{ locale: string }>;
}

type Ui = Record<string, string>;

/** Icons in the order of the content file: the three benefits, then the four kinds of consulting. */
const WHY_ICONS: IconType[] = [RiTeamLine, RiRocketLine, RiLineChartLine];
const SERVICE_ICONS: IconType[] = [RiBriefcaseLine, RiBuildingLine, RiSettings3Line, RiUserSettingsLine];

export default async function Page(props: PageProps) {
  const params = await props.params;
  const locale = params.locale;
  const isFr = locale?.toLowerCase().startsWith("fr");
  const t = (
    isFr
      ? (await import("@/messages/fr/support-services/consulting/index.json")).default
      : (await import("@/messages/en/support-services/consulting/index.json")).default
  ) as unknown as ConsultingPageT & { ui: Ui; services: { illustration?: string } };
  const cta = isFr
    ? (await import("@/messages/fr/home.json")).default.home.contactCta
    : (await import("@/messages/en/home.json")).default.home.contactCta;
  const ui = t.ui;

  return (
    <>
      <ProductHero
        dark
        kicker={ui.kicker}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        bgImage={t.hero.bgGraphic}
        contactLabel={ui.contact}
        anchorLabel={ui.anchor}
        anchor="engagement"
        locale={locale}
      />

      {/* What the consultants bring */}
      <section className="bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.whyKicker} title={ui.whyTitle} />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {t.features.items.map((f, i) => {
              const Icon = WHY_ICONS[i] ?? RiTeamLine;
              return (
                <li key={f.title} className="rounded-lg border border-slate-200 bg-white p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0079c1] text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[20px] font-semibold leading-snug text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{f.desc}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Two levels of engagement: turnkey projects, or consulting alongside the customer's team */}
      <section id="engagement" className="scroll-mt-16 bg-[#07131f] text-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead dark kicker={ui.engagementKicker} title={t.engagement.title} text={t.engagement.blurb} />

          <div className="mt-12 grid items-center gap-8 border-t border-white/10 pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            {t.projects.illustration && (
              <div className="relative mx-auto aspect-[4/3] w-full max-w-[420px]">
                <Image src={t.projects.illustration} alt="" fill sizes="(min-width: 1024px) 420px, 80vw" className="object-contain" />
              </div>
            )}
            <div>
              <h3 className="text-[26px] font-bold leading-tight sm:text-[30px]">{t.projects.title}</h3>
              {t.projects.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-[17px] leading-relaxed text-slate-300">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-12 grid items-center gap-8 border-t border-white/10 pt-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <h3 className="text-[26px] font-bold leading-tight sm:text-[30px]">{t.services.title}</h3>
              <p className="mt-4 text-[17px] leading-relaxed text-slate-300">{t.services.description}</p>
            </div>
            {t.services.illustration && (
              <div className="relative order-first mx-auto aspect-[4/3] w-full max-w-[420px] lg:order-none">
                <Image src={t.services.illustration} alt="" fill sizes="(min-width: 1024px) 420px, 80vw" className="object-contain" />
              </div>
            )}
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.cards.map((c, i) => {
              const Icon = SERVICE_ICONS[i] ?? RiBriefcaseLine;
              return (
                <li key={c.title} className="rounded-lg border border-white/10 bg-[#0b1d2e] p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-sky-400/15 text-sky-300">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h4 className="mt-5 text-[19px] font-semibold leading-snug">{c.title}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{c.desc}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ContactCta data={cta} locale={locale} />
    </>
  );
}
