import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine, RiBookOpenLine } from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { ProductHero, SectionHead, container, focusRing } from "@/app/[locale]/arcgis/products/_shared/blocks";
import { getCommon } from "@/i18n/common";
import NewsCards from "../_components/NewsCards";
import { newsContext, type NewsHero, type Ui } from "../content";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/news/ebook");

interface PageProps {
  params: Promise<{ locale: string }>;
}

type Book = { title: string; text: string; meta?: string; href: string; cta: string; relatedLabel?: string; relatedHref?: string };

// E-books: the list is the "books" block of the content file; add an entry there to publish a new one.
export default async function Page(props: PageProps) {
  const { locale } = await props.params;
  const { lang, index, labels, cta, stories } = await newsContext(locale);
  const t = (await import(`@/messages/${lang}/news/ebook/index.json`)).default as unknown as { hero: NewsHero; ui: Ui; books: Book[] };
  const ui = t.ui;
  const common = getCommon(locale);

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
        anchor="livres"
        locale={locale}
      />

      <section id="livres" className="scroll-mt-16 bg-slate-50">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.listKicker} title={ui.listTitle} />
          <ul className="mt-10 grid gap-5 lg:grid-cols-2">
            {t.books.map((book) => (
              <li key={book.title} className="flex gap-5 rounded-lg border border-slate-200 bg-white p-6 sm:gap-6 sm:p-7">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-[#0079c1] text-white">
                  <RiBookOpenLine className="h-7 w-7" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  {book.meta && <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-600">{book.meta}</p>}
                  <h3 className="mt-1 text-[22px] font-semibold leading-snug text-slate-900">{book.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-slate-700">{book.text}</p>
                  <a
                    href={book.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#0079c1] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#005e95] ${focusRing}`}
                  >
                    {book.cta}
                    <RiArrowRightUpLine className="h-4 w-4" aria-hidden />
                    <span className="sr-only"> {common.opensInNewTab}</span>
                  </a>
                  {book.relatedHref && book.relatedLabel && (
                    <p className="mt-5 border-t border-slate-200 pt-4 text-[15px] text-slate-700">
                      {ui.related} :{" "}
                      <Link
                        href={`/${locale}${book.relatedHref}`}
                        className={`group inline-flex items-center gap-1.5 font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
                      >
                        {book.relatedLabel}
                        <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
                      </Link>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className={`${container} py-16 lg:py-20`}>
          <SectionHead kicker={ui.othersKicker} title={ui.othersTitle} />
          <NewsCards cards={index.cards.filter((c) => c.key !== "ebook")} labels={labels} locale={locale} storyCount={stories.length} />
        </div>
      </section>

      <ContactCta data={cta} locale={locale} />
    </>
  );
}
