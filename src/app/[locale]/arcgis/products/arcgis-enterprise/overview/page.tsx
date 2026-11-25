import Image from "next/image";
import type { IconType } from "react-icons";
import { RiBarChartBoxLine, RiDatabase2Line, RiMap2Line, RiShieldCheckLine } from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { LinkArrow, LinkTiles, ProductHero, SectionHead, SmartLink, Steps, StoryCards, container, focusRing } from "../../_shared/blocks";
import { resolveLink } from "../../_shared/links";
import type { EnterpriseOverviewMessages } from "./constants";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/arcgis/products/arcgis-enterprise/overview");

interface PageProps {
  params: Promise<{ locale: string }>;
}

type Ui = Record<string, string>;
// same order as the four capabilities of the content: deployment, data, mapping, analysis
const CAP_ICONS: IconType[] = [RiShieldCheckLine, RiDatabase2Line, RiMap2Line, RiBarChartBoxLine];

export default async function Page(props: PageProps) {
  const params = await props.params;
  const isFr = params.locale?.toLowerCase().startsWith("fr");
  const raw = isFr
    ? (await import("@/messages/fr/products/arcgis-enterprise/overview.json")).default
    : (await import("@/messages/en/products/arcgis-enterprise/overview.json")).default;
  const t = raw as unknown as EnterpriseOverviewMessages & { ui: Ui };
  const ui = t.ui;
  const cta = isFr
    ? (await import("@/messages/fr/home.json")).default.home.contactCta
    : (await import("@/messages/en/home.json")).default.home.contactCta;
  const locale = params.locale;

  return (
    <>
      <ProductHero
        dark
        kicker={ui.kicker}
        icon={t.hero.logoImage}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        text={t.intro.paragraph}
        bgImage={t.hero.bgImage}
        image={t.hero.montageImage}
        imageAlt={t.hero.montageAlt}
        contactLabel={ui.contact}
        anchorLabel={ui.discover}
        anchor="fonctionnalites"
        locale={locale}
      />

      {/* The platform and its four capabilities */}
      <section id="fonctionnalites" className="scroll-mt-16 bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <SectionHead kicker={ui.softwareKicker} title={t.software.heading} text={t.software.subheading} />
            <div className="relative aspect-[16/9] w-full">
              <Image src={t.software.image} alt={t.software.imageAlt} fill sizes="(min-width: 1024px) 680px, 100vw" className="object-contain" />
            </div>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.capabilities.items.map((item, i) => {
              const Icon = CAP_ICONS[i % CAP_ICONS.length];
              const linked = Boolean(resolveLink(item.href, locale).href);
              return (
                <li key={item.title} className="flex flex-col rounded-lg border border-slate-200 bg-white p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0079c1]/[0.08] text-[#0079c1]" aria-hidden>
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-[19px] font-semibold leading-snug text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{item.desc}</p>
                  {linked && (
                    <SmartLink
                      href={item.href}
                      locale={locale}
                      className={`group mt-auto inline-flex items-center gap-2 self-start pt-5 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
                    >
                      {item.cta}
                      <LinkArrow href={item.href} locale={locale} />
                    </SmartLink>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Steps
        kicker={ui.howKicker}
        title={ui.howTitle}
        image={t.howItWorks.graphic}
        imageAlt={t.howItWorks.graphicAlt}
        steps={t.howItWorks.rows}
      />

      <StoryCards kicker={ui.storiesKicker} title={t.success.title} text={t.success.desc} items={t.success.pills} locale={locale} />

      <LinkTiles
        kicker={ui.ecosystemKicker}
        title={t.foundation.heading}
        text={t.foundation.blurb}
        items={t.foundation.tiles.map((tile) => ({ title: tile.title, desc: tile.desc, linkText: tile.hrefText, href: tile.hrefUrl, icon: tile.icon }))}
        locale={locale}
      />

      <ContactCta data={cta} locale={locale} />
    </>
  );
}
