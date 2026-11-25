import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { ProductHero, SectionHead, container } from "@/app/[locale]/arcgis/products/_shared/blocks";
import ExploreCards, { type ExploreCard } from "../_components/ExploreCards";
import type { AssetPageT } from "./constants";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/support-services/learning/schedule");

interface PageProps {
  params: Promise<{ locale: string }>;
}

type Ui = Record<string, string>;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const locale = params.locale;
  const isFr = locale?.toLowerCase().startsWith("fr");
  const t = (
    isFr
      ? (await import("@/messages/fr/support-services/learning/schedule/index.json")).default
      : (await import("@/messages/en/support-services/learning/schedule/index.json")).default
  ) as unknown as AssetPageT & { ui: Ui };
  // the cards of the training page, without the one that leads to this page
  const learning = isFr
    ? (await import("@/messages/fr/support-services/learning/index.json")).default
    : (await import("@/messages/en/support-services/learning/index.json")).default;
  const cards = (learning.community.cards as ExploreCard[]).filter((c) => !c.link.endsWith("/schedule"));
  const courseCount = (
    isFr
      ? (await import("@/messages/fr/support-services/learning/courses/index.json")).default
      : (await import("@/messages/en/support-services/learning/courses/index.json")).default
  ).community.cards.length;
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
        subtitle={t.hero.description}
        text={ui.text}
        bgImage={t.hero.bgGraphic}
        contactLabel={ui.contact}
        anchorLabel={ui.anchor}
        anchor="en-attendant"
        locale={locale}
      />

      <section id="en-attendant" className="scroll-mt-16 bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.meanwhileKicker} title={ui.meanwhileTitle} />
          <ExploreCards cards={cards} locale={locale} courseCount={courseCount} />
        </div>
      </section>

      <ContactCta data={cta} locale={locale} />
    </>
  );
}
