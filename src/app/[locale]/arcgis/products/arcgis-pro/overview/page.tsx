import Image from "next/image";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import {
  LinkArrow,
  LinkTiles,
  ProductHero,
  SectionHead,
  SmartLink,
  Steps,
  StoryCards,
  container,
  focusRing,
} from "../../_shared/blocks";
import Showcase from "../../_shared/Showcase";
import type { ProOverviewMessages } from "./constants";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/arcgis/products/arcgis-pro/overview");

interface PageProps {
  params: Promise<{ locale: string }>;
}

type Ui = Record<string, string>;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const isFr = params.locale?.toLowerCase().startsWith("fr");
  const raw = isFr
    ? (await import("@/messages/fr/products/arcgis-pro/overview.json")).default
    : (await import("@/messages/en/products/arcgis-pro/overview.json")).default;
  const t = raw as unknown as ProOverviewMessages & { ui: Ui };
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
        image={t.hero.mediaImage}
        imageAlt={t.hero.mediaAlt}
        contactLabel={ui.contact}
        anchorLabel={ui.discover}
        anchor="fonctionnalites"
        locale={locale}
      />

      {/* Capabilities, as tabs */}
      <section id="fonctionnalites" className="scroll-mt-16 bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.capabilitiesKicker} title={t.stories.title} text={t.stories.description} />
          <Showcase items={t.stories.items} label={ui.capabilitiesLabel} />
        </div>
      </section>

      <Steps
        kicker={ui.howKicker}
        title={ui.howTitle}
        image={t.howItWorks.illustration}
        imageAlt={t.howItWorks.illustrationAlt}
        steps={t.howItWorks.steps}
      />

      <StoryCards kicker={ui.storiesKicker} title={t.success.title} text={t.success.desc} items={t.success.pills} locale={locale} />

      <LinkTiles
        kicker={ui.ecosystemKicker}
        title={t.ecosystem.title}
        text={t.ecosystem.desc}
        bgImage={t.ecosystem.crossImage}
        items={t.ecosystem.items.map((it) => ({ title: it.title, desc: it.desc, linkText: it.hrefLabel, href: it.href }))}
        locale={locale}
      />

      {/* Extensions, grouped by family */}
      <section className="bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.extensionsKicker} title={t.extensions.title} />
          {t.extensions.categories.map((cat) => (
            <div key={cat.label} className="mt-10">
              <h3 className="flex items-baseline gap-3 border-b border-slate-200 pb-3 text-[20px] font-semibold text-slate-900">
                {cat.label}
                <span className="text-[14px] font-medium text-slate-500">{cat.cards.length}</span>
              </h3>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cat.cards.map((card) => (
                  <li key={card.title}>
                    <SmartLink
                      href={card.actionUrl}
                      locale={locale}
                      className={`group flex h-full items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}`}
                    >
                      <span className="relative block h-20 w-28 shrink-0 overflow-hidden rounded-md bg-slate-100">
                        <Image src={card.image} alt="" fill sizes="112px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[17px] font-semibold leading-snug text-slate-900">{card.title}</span>
                        <span className="mt-1 block text-[14.5px] leading-relaxed text-slate-700">{card.desc}</span>
                        <span className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                          {ui.learnMore}
                          <LinkArrow href={card.actionUrl} locale={locale} />
                        </span>
                      </span>
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <ContactCta data={cta} locale={locale} />
    </>
  );
}
