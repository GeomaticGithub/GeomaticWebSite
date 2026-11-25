import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiMailSendLine } from "react-icons/ri";
import { Kicker, ProductHero, SectionHead, container, focusRing } from "@/app/[locale]/arcgis/products/_shared/blocks";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/about-geomatic/careers");

interface PageProps {
  params: Promise<{ locale: string }>;
}

type Messages = {
  hero: { title: string; subtitle?: string; text?: string; bgImage?: string };
  ui: Record<string, string>;
  reasons: { kicker: string; title: string; image?: string; items: { title: string; text: string }[] };
  apply: { kicker: string; title: string; text: string; cta: string; email: string; image?: string };
};

// Careers: why join Geomatic, then how to apply (by e-mail, or through the contact form).
export default async function Page(props: PageProps) {
  const { locale } = await props.params;
  const isFr = locale?.toLowerCase().startsWith("fr");
  const t = (
    isFr
      ? (await import("@/messages/fr/about-geomatic/careers/index.json")).default
      : (await import("@/messages/en/about-geomatic/careers/index.json")).default
  ) as unknown as Messages;
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
        anchor="postuler"
        locale={locale}
      />

      {/* Why join: a picture and the three reasons */}
      <section className="bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={t.reasons.kicker} title={t.reasons.title} />
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            {t.reasons.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 lg:sticky lg:top-24 lg:aspect-[4/5]">
                <Image src={t.reasons.image} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
              </div>
            )}
            <ol className="space-y-10">
              {t.reasons.items.map((item, i) => (
                <li key={item.title}>
                  <p className="text-[14px] font-semibold tabular-nums text-[#0079c1]" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-[24px] font-bold leading-tight text-slate-900 sm:text-[28px]">{item.title}</h3>
                  <p className="mt-3 text-[17px] leading-relaxed text-slate-700">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section id="postuler" className="scroll-mt-16 border-t border-slate-200 bg-slate-50">
        <div className={`${container} grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24`}>
          <div>
            <Kicker>{t.apply.kicker}</Kicker>
            <h2 className="mt-4 text-[30px] font-bold leading-[1.12] text-slate-900 sm:text-[40px]">{t.apply.title}</h2>
            <p className="mt-4 text-[18px] leading-relaxed text-slate-700">{t.apply.text}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={`mailto:${t.apply.email}`}
                className={`inline-flex min-h-[52px] items-center justify-center gap-2.5 bg-[#0079c1] px-6 text-[16px] font-semibold text-white transition-colors hover:bg-[#005e95] ${focusRing}`}
              >
                <RiMailSendLine className="h-5 w-5" aria-hidden />
                {t.apply.cta}
              </a>
              <Link
                href={`/${locale}/about-geomatic/contact`}
                className={`group inline-flex items-center gap-2 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
              >
                {ui.form}
                <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
              </Link>
            </div>
            <p className="mt-4 text-[15px] text-slate-700">
              <a href={`mailto:${t.apply.email}`} className={`font-medium underline underline-offset-4 hover:text-[#005e95] ${focusRing}`}>
                {t.apply.email}
              </a>
            </p>
          </div>
          {t.apply.image && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-slate-200">
              <Image src={t.apply.image} alt="" fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
