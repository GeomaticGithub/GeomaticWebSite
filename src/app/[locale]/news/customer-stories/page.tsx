import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { ProductHero, SectionHead, container } from "@/app/[locale]/arcgis/products/_shared/blocks";
import NewsCards from "../_components/NewsCards";
import StoryCards from "../_components/StoryCards";
import { newsContext, type NewsHero, type Ui } from "../content";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/news/customer-stories");

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Customer stories: the ones Esri published, already shown on the sector pages (see ../stories.ts).
export default async function Page(props: PageProps) {
  const { locale } = await props.params;
  const { lang, index, labels, cta, stories } = await newsContext(locale);
  const t = (await import(`@/messages/${lang}/news/customer-stories/index.json`)).default as unknown as { hero: NewsHero; ui: Ui };
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
        anchor="histoires"
        locale={locale}
      />

      <section id="histoires" className="scroll-mt-16 bg-slate-50">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.listKicker} title={ui.listTitle} text={ui.listText} />
          <StoryCards stories={stories} labels={labels} locale={locale} readLabel={ui.read} sectorLabel={ui.sector} />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className={`${container} py-16 lg:py-20`}>
          <SectionHead kicker={ui.othersKicker} title={ui.othersTitle} />
          <NewsCards cards={index.cards.filter((c) => c.key !== "stories")} labels={labels} locale={locale} storyCount={stories.length} />
        </div>
      </section>

      <ContactCta data={cta} locale={locale} />
    </>
  );
}
