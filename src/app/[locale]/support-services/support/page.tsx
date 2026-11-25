import Image from "next/image";
import Link from "next/link";
import { RiCheckLine, RiMailLine, RiMessage2Line, RiPhoneLine } from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { Reach, reachRow } from "@/app/[locale]/support-services/_components/Reach";
import { telHref } from "@/app/[locale]/about-geomatic/contact/constants";
import {
  LinkArrow,
  ProductHero,
  SectionHead,
  SmartLink,
  container,
  focusRing,
} from "@/app/[locale]/arcgis/products/_shared/blocks";
import type { AssetPageT } from "./constants";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/support-services/support");

interface PageProps {
  params: Promise<{ locale: string }>;
}

type Ui = Record<string, string>;

const rowClass = reachRow;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const locale = params.locale;
  const isFr = locale?.toLowerCase().startsWith("fr");
  const t = (
    isFr
      ? (await import("@/messages/fr/support-services/support/index.json")).default
      : (await import("@/messages/en/support-services/support/index.json")).default
  ) as unknown as AssetPageT & { ui: Ui; prepare: string[] };
  const home = isFr ? (await import("@/messages/fr/home.json")).default : (await import("@/messages/en/home.json")).default;
  // support address and phone numbers are kept in one place: the contact page and the footer
  const contactPage = isFr
    ? (await import("@/messages/fr/about-geomatic/contact/index.json")).default
    : (await import("@/messages/en/about-geomatic/contact/index.json")).default;
  const supportMail = contactPage.topics.cards.find((c) => c.icon === "support" && c.link.startsWith("mailto:"));
  const phone = home.footer.contact.phones[0];
  const ui = t.ui;

  return (
    <>
      <ProductHero
        kicker={ui.kicker}
        title={t.hero.title}
        subtitle={t.intro.title}
        text={t.intro.paragraph}
        bgImage={t.hero.bgGraphic}
        contactLabel={ui.contact}
        anchorLabel={ui.anchor}
        anchor="produits"
        locale={locale}
      />

      {/* How to reach the support team */}
      <section className="bg-white">
        <div className={`${container} grid gap-10 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-24`}>
          <div>
            <SectionHead kicker={ui.reachKicker} title={t.intro.subTitle} />
            <p className="mt-8 text-[16px] font-semibold text-slate-900">{ui.prepareTitle}</p>
            <ul className="mt-3 space-y-2.5">
              {t.prepare.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[16px] leading-snug text-slate-700">
                  <RiCheckLine className="mt-0.5 h-5 w-5 shrink-0 text-[#0079c1]" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <ul className="self-start overflow-hidden rounded-lg border border-slate-200 bg-white">
            {supportMail && (
              <li>
                <a href={supportMail.link} className={rowClass}>
                  <Reach icon={RiMailLine} label={ui.emailLabel} value={supportMail.cta} />
                </a>
              </li>
            )}
            <li className="border-t border-slate-200 first:border-t-0">
              <a href={telHref(phone)} className={rowClass}>
                <Reach icon={RiPhoneLine} label={ui.phoneLabel} value={<span className="tabular-nums">{phone}</span>} />
              </a>
            </li>
            <li className="border-t border-slate-200">
              <Link href={`/${locale}/about-geomatic/contact`} className={rowClass}>
                <Reach icon={RiMessage2Line} label={ui.formLabel} value={ui.formCta} />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Esri support resources, by product family */}
      <section id="produits" className="scroll-mt-16 border-t border-slate-200 bg-slate-50">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={ui.productsKicker} title={t.community.title} text={ui.productsText} />
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {t.community.cards.map((card) => (
              <li key={card.title}>
                <SmartLink
                  href={card.link}
                  locale={locale}
                  className={`group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0079c1]/10">
                    <Image src={card.image} alt="" width={30} height={30} className="h-[30px] w-[30px] object-contain" />
                  </span>
                  <span className="mt-4 flex items-start justify-between gap-2 text-[16px] font-semibold leading-snug text-slate-900 group-hover:text-[#005e95]">
                    {card.title}
                    <span className="mt-0.5 inline-flex text-[#0079c1]">
                      <LinkArrow href={card.link} locale={locale} />
                    </span>
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta data={home.home.contactCta} locale={locale} />
    </>
  );
}
