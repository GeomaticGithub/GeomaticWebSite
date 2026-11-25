import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { ProductHero, SectionHead, container } from "@/app/[locale]/arcgis/products/_shared/blocks";
import NewsCards from "./_components/NewsCards";
import { newsContext } from "./content";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/news");

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Overview of the publications: customer stories, e-books and newsletters.
export default async function Page(props: PageProps) {
  const { locale } = await props.params;
  const { index: t, labels, cta, stories } = await newsContext(locale);

  return (
    <>
      <ProductHero
        dark
        kicker={t.hero.kicker ?? ""}
        title={t.hero.title}
        text={t.hero.text}
        bgImage={t.hero.bgImage}
        contactLabel={t.hero.contact ?? ""}
        anchorLabel={t.hero.anchor}
        anchor="publications"
        locale={locale}
      />

      <section id="publications" className="scroll-mt-16 bg-slate-50">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={t.list.kicker} title={t.list.title} />
          <NewsCards cards={t.cards} labels={labels} locale={locale} storyCount={stories.length} />
        </div>
      </section>

      <ContactCta data={cta} locale={locale} />
    </>
  );
}
