import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine, RiBookOpenLine, RiNewspaperLine } from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { ProductHero, SectionHead, container, focusRing } from "@/app/[locale]/arcgis/products/_shared/blocks";
import { emph } from "@/app/[locale]/arcgis/products/_shared/text";
import { getCommon } from "@/i18n/common";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/arcgis/products/spatial-analytics-data-science/overview");

interface PageProps {
  params: Promise<{ locale: string }>;
}

type Benefit = { title: string; p1: string; image: string };
type Product = { category: string; title: string; desc: string; href: string };
type Messages = {
  ui: Record<string, string>;
  hero: { title: string; subtitle?: string; image?: string; bgImage?: string };
  intro: { paragraph: string };
  videoBlock: { title: string; desc: string; url: string };
  sections: Record<string, Benefit>;
  products: { title: string } & Record<string, Product | string>;
  dualPromo: Record<string, string>;
  contact: { title: string; desc: string; cta: string };
};

const cardHover = `transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}`;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const locale = params.locale;
  const isFr = locale?.toLowerCase().startsWith("fr");
  const t = (
    isFr
      ? (await import("@/messages/fr/arcgis/products/spatial-analytics-data-science/overview.json")).default
      : (await import("@/messages/en/arcgis/products/spatial-analytics-data-science/overview.json")).default
  ) as unknown as Messages;
  const cta = isFr
    ? (await import("@/messages/fr/home.json")).default.home.contactCta
    : (await import("@/messages/en/home.json")).default.home.contactCta;
  const common = getCommon(locale);
  const ui = t.ui;
  const benefits = Object.values(t.sections);
  const products = Object.values(t.products).filter((p): p is Product => typeof p === "object");
  const d = t.dualPromo;
  const resources = [
    { icon: RiBookOpenLine, title: d.SpacialAnalysisTitle, text: d.SpacialAnalysisDesc, label: d.SpacialAnalysisCta, href: d.SpacialAnalysisHref },
    { icon: RiNewspaperLine, title: d.blogTitle, text: d.blogDesc, label: d.blogCta, href: d.blogHref },
  ];

  return (
    <>
      <ProductHero
        dark
        kicker={ui.kicker}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        text={t.intro.paragraph}
        bgImage={t.hero.bgImage}
        image={t.hero.image}
        contactLabel={ui.contact}
        anchorLabel={ui.anchor}
        anchor="atouts"
        locale={locale}
      />

      {/* The four strengths: picture and text alternating */}
      <section id="atouts" className="scroll-mt-16 bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.benefitsKicker} title={ui.benefitsTitle} />
          <div className="mt-10 space-y-10 lg:space-y-12">
            {benefits.map((b, i) => (
              <article
                key={b.title}
                className={`grid items-center gap-6 lg:gap-14 ${i % 2 ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"}`}
              >
                <div className={`relative aspect-[16/10] overflow-hidden rounded-lg bg-[#07131f] ${i % 2 ? "lg:order-last" : ""}`}>
                  <Image src={b.image} alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold tabular-nums text-[#0079c1]" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-[24px] font-bold leading-tight text-slate-900 sm:text-[28px]">{b.title}</h3>
                  <p className="mt-3 text-[17px] leading-relaxed text-slate-700">{b.p1}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="bg-[#07131f] text-white">
        <div className={`${container} grid items-center gap-8 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24`}>
          <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
            <iframe
              src={t.videoBlock.url}
              title={t.videoBlock.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <SectionHead dark kicker={ui.videoKicker} title={t.videoBlock.title} text={t.videoBlock.desc} />
        </div>
      </section>

      {/* The ArcGIS products that carry out the analysis */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.productsKicker} title={t.products.title} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <li key={p.title}>
                <Link href={`/${locale}${p.href}`} className={`group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 ${cardHover}`}>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#005e95]">{p.category}</span>
                  <span className="mt-3 block text-[20px] font-semibold leading-snug text-slate-900 group-hover:text-[#005e95]">{p.title}</span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-slate-700">{p.desc}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                    {ui.productLink}
                    <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ebook and blog, on the Esri site */}
      <section className="bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.resourcesKicker} title={ui.resourcesTitle} />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {resources.map((r) => {
              const linked = /^https?:\/\//.test(r.href ?? "");
              const Icon = r.icon;
              const body = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#0079c1] text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[20px] font-semibold leading-snug text-slate-900 group-hover:text-[#005e95]">{r.title}</span>
                    <span className="mt-2 block text-[15px] leading-relaxed text-slate-700">{emph(r.text)}</span>
                    {linked && (
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                        {r.label}
                        <RiArrowRightUpLine className="h-4 w-4 shrink-0" aria-hidden />
                        <span className="sr-only"> {common.opensInNewTab}</span>
                      </span>
                    )}
                  </span>
                </>
              );
              const box = "group flex h-full items-start gap-5 rounded-lg border border-slate-200 bg-white p-6";
              return (
                <li key={r.title}>
                  {linked ? (
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className={`${box} ${cardHover}`}>
                      {body}
                    </a>
                  ) : (
                    <div className={box}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ContactCta data={{ ...cta, title: t.contact.title, subtitle: t.contact.desc, primary: t.contact.cta }} locale={locale} />
    </>
  );
}
