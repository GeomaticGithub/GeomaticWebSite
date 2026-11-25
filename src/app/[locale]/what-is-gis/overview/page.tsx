import Image from "next/image";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import {
  LinkArrow,
  ProductHero,
  SectionHead,
  SmartLink,
  container,
  focusRing,
} from "@/app/[locale]/arcgis/products/_shared/blocks";
import { resolveLink } from "@/app/[locale]/arcgis/products/_shared/links";
import Showcase from "@/app/[locale]/arcgis/products/_shared/Showcase";
import { emph } from "@/app/[locale]/arcgis/products/_shared/text";
import type { WhatIsGisMessages } from "./constants";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/what-is-gis/overview");

interface PageProps {
  params: Promise<{ locale: string }>;
}

type Ui = Record<string, string>;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const isFr = params.locale?.toLowerCase().startsWith("fr");
  const raw = isFr
    ? (await import("@/messages/fr/what-is-gis/overview.json")).default
    : (await import("@/messages/en/what-is-gis/overview.json")).default;
  const t = raw as unknown as WhatIsGisMessages & { ui: Ui };
  const ui = t.ui;
  const cta = isFr
    ? (await import("@/messages/fr/home.json")).default.home.contactCta
    : (await import("@/messages/en/home.json")).default.home.contactCta;
  const locale = params.locale;

  return (
    <>
      <ProductHero
        kicker={ui.kicker}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        text={t.intro.paragraph}
        image={t.hero.image}
        contactLabel={ui.contact}
        anchorLabel={ui.how}
        anchor="fonctionnement"
        locale={locale}
      />

      {/* What GIS is used for: six examples, each with a live map */}
      <section id="exemples" className="scroll-mt-16 bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.whatKicker} title={ui.whatTitle} text={t.split.description} />
          <Showcase
            label={ui.examplesLabel}
            items={t.split.items.map((it) => ({
              title: it.label,
              description: it.description,
              mainImage: it.mainImage,
              avatarImage: it.avatarImage,
              href: it.href,
              linkText: it.linkText,
            }))}
          />
        </div>
      </section>

      {/* How GIS works: maps, data, analysis, apps */}
      <section id="fonctionnement" className="scroll-mt-16 border-y border-slate-200 bg-slate-50">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.worksKicker} title={t.works.title} text={t.works.intro} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.works.cards.map((card) => {
              const linked = Boolean(resolveLink(card.href, locale).href);
              return (
                <li key={card.title} className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <Image src={card.image} alt="" fill sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw" className="object-contain p-4" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-[20px] font-semibold leading-snug text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{card.body}</p>
                    {linked && (
                      <SmartLink
                        href={card.href}
                        locale={locale}
                        className={`group mt-auto inline-flex items-start gap-1.5 self-start pt-5 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
                      >
                        <span>{emph(card.ctaText)}</span>
                        <span className="mt-1 inline-flex">
                          <LinkArrow href={card.href} locale={locale} />
                        </span>
                      </SmartLink>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Go further */}
      <section className="bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.moreKicker} title={ui.moreTitle} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.bottomCtas.items.map((item) => {
              const linked = Boolean(resolveLink(item.href, locale).href);
              return (
                <li key={item.title}>
                  <SmartLink
                    href={item.href}
                    locale={locale}
                    className={`group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 ${
                      linked ? `transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}` : ""
                    }`}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0079c1]">
                      <Image src={item.icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                    </span>
                    <span className="mt-5 block text-[19px] font-semibold leading-snug text-slate-900">{item.title}</span>
                    <span className="mt-2 block text-[15px] leading-relaxed text-slate-700">{item.body}</span>
                    {linked && (
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                        {item.linkText}
                        <LinkArrow href={item.href} locale={locale} />
                      </span>
                    )}
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ContactCta data={cta} locale={locale} secondary={false} />
    </>
  );
}
