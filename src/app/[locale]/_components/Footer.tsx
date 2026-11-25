// app/[locale]/_components/Footer.tsx
"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  RiGlobalLine,
  RiMapPin2Line,
  RiPhoneLine,
  RiPrinterLine,
  RiMailLine,
  RiArrowRightUpLine,
} from "react-icons/ri";
import { getCommon } from "@/i18n/common";
import { LANGUAGES, isExternalHref, withLocale } from "./utils";

type LinkMsg = { text: string; href: string };
type FooterMsgs = {
  nav: string;
  follow: string;
  tagline: string;
  contact: {
    title: string;
    addressLabel: string;
    address: string[];
    mapLabel: string;
    phoneLabel: string;
    phones: string[];
    faxLabel: string;
    fax: string;
    emailLabel: string;
    email: string;
  };
  headings: { arcgis: string; community: string; understanding: string; about: string };
  links: {
    arcgisPro: LinkMsg; arcgisEnterprise: LinkMsg; arcgisOnline: LinkMsg; arcgisDevelopers: LinkMsg;
    events: LinkMsg; whatIsGis: LinkMsg; aboutGeomatic: LinkMsg; contactUs: LinkMsg; careers: LinkMsg; partners: LinkMsg;
  };
  social: { facebook: LinkMsg; twitter: LinkMsg; instagram: LinkMsg; linkedin: LinkMsg; youtube: LinkMsg; esriCommunity: LinkMsg };
  lang: { current: string; english: string; french: string };
  legalNav: string;
  legal: LinkMsg[];
  copyright: string;
};

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2";
const linkClass = `text-gray-700 underline-offset-4 transition-colors hover:text-black hover:underline ${focusRing}`;

/** A social link is shown only when it points to an actual account, not to the bare home page of the network. */
const isRealAccount = (href: string) => {
  try {
    return new URL(href).pathname.replace(/\/+$/, "").length > 0;
  } catch {
    return false;
  }
};

export default function Footer({ data, locale }: { data: FooterMsgs; locale: string }) {
  const year = new Date().getFullYear();
  const common = getCommon(locale);
  const currentLang = data.lang.current.replace(
    "{language}",
    LANGUAGES.find((l) => l.code === locale)?.label ?? locale.toUpperCase()
  );

  // Opens the header language dialog (fixed overlay, takes focus, returns it here on close).
  const openLanguageModal = () =>
    window.dispatchEvent(new CustomEvent("open-language-modal"));

  const L = data.links, C = data.contact;
  const columns = [
    { title: data.headings.arcgis, links: [L.arcgisPro, L.arcgisEnterprise, L.arcgisOnline, L.arcgisDevelopers] },
    { title: data.headings.community, links: [L.events, data.social.esriCommunity] },
    { title: data.headings.understanding, links: [L.whatIsGis] },
    { title: data.headings.about, links: [L.aboutGeomatic, L.partners, L.careers, L.contactUs] },
  ];
  const socials = [
    { ...data.social.linkedin, Icon: FaLinkedin },
    { ...data.social.facebook, Icon: FaFacebook },
    { ...data.social.twitter, Icon: FaXTwitter },
    { ...data.social.instagram, Icon: FaInstagram },
    { ...data.social.youtube, Icon: FaYoutube },
  ].filter((s) => isRealAccount(s.href));

  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Geomatic, ${C.address.join(", ")}`)}`;
  const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;
  const heading = "border-b border-gray-300 pb-4 text-[15px] font-semibold uppercase tracking-wide text-black";

  return (
    <footer className="bg-white text-gray-700">
      {/* Brand gradient stripe */}
      <div
        className="h-[4px] w-full"
        style={{ backgroundImage: "linear-gradient(90deg,#1e40af 0%,#4f46e5 30%,#8b5cf6 55%,#38bdf8 80%,#22d3ee 100%)" }}
        aria-hidden
      />

      <div className="mx-auto max-w-[1440px] px-4 lg:px-6 pt-12 pb-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Brand column (same layout as esri.com): marks on top, social squares below */}
          <div className="flex shrink-0 flex-row flex-wrap items-center gap-x-8 gap-y-6 lg:block lg:w-[160px]">
            <Link href={`/${locale}`} className={`inline-flex rounded ${focusRing}`}>
              <img src="/geomatic-logo.png" alt="Geomatic" width={200} height={90} loading="lazy" className="h-14 w-auto" />
            </Link>
            <img
              src="/esri-official-distributor.png"
              alt={common.esriDistributor}
              width={483}
              height={104}
              loading="lazy"
              className="h-auto w-40 grayscale lg:mt-5"
            />
            <img
              src="/the-science-of-where.png"
              alt="The Science of Where"
              width={342}
              height={342}
              loading="lazy"
              className="h-[104px] w-[104px] lg:mt-7 lg:h-[156px] lg:w-[156px]"
            />
            {socials.length > 0 && (
              <ul aria-label={data.follow} className="grid w-[156px] grid-cols-3 gap-2 lg:mt-7">
                {socials.map(({ text, href, Icon }) => (
                  <li key={text}>
                    <a
                      href={href}
                      aria-label={`${text} ${common.opensInNewTab}`}
                      title={text}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex h-[46px] w-[46px] items-center justify-center bg-[#6e6e6e] text-white transition-colors hover:bg-[#4a4a4a] ${focusRing}`}
                    >
                      <Icon className="h-6 w-6" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Link columns, then the contact column */}
          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:pt-2">
            <nav aria-label={data.nav} className="contents">
              {columns.map((col) => (
                <div key={col.title}>
                  <h2 className={heading}>{col.title}</h2>
                  <ul className="mt-6 space-y-4 text-[15px]">
                    {col.links.map((link) => (
                      <li key={link.text}>
                        {isExternalHref(link.href) ? (
                          <a href={link.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${linkClass}`}>
                            {link.text}
                            <RiArrowRightUpLine className="h-4 w-4 text-gray-500" aria-hidden />
                            <span className="sr-only"> {common.opensInNewTab}</span>
                          </a>
                        ) : (
                          <Link href={withLocale(locale, link.href)} className={linkClass}>
                            {link.text}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="col-span-2 sm:col-span-1">
              <h2 className={heading}>{C.title}</h2>
              <address className="mt-6 space-y-4 text-[15px] not-italic leading-relaxed">
                <div className="flex gap-2.5">
                  <RiMapPin2Line className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" aria-hidden />
                  <div>
                    <span className="sr-only">{C.addressLabel} : </span>
                    {C.address.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                    <a href={mapHref} target="_blank" rel="noopener noreferrer" className={`mt-1 inline-flex items-center gap-1 text-black underline underline-offset-4 hover:no-underline ${focusRing}`}>
                      {C.mapLabel}
                      <RiArrowRightUpLine className="h-4 w-4" aria-hidden />
                      <span className="sr-only"> {common.opensInNewTab}</span>
                    </a>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <RiPhoneLine className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" aria-hidden />
                  <ul>
                    {C.phones.map((p, i) => (
                      <li key={p}>
                        {i === 0 && <span className="sr-only">{C.phoneLabel} : </span>}
                        <a href={tel(p)} className={`whitespace-nowrap tabular-nums ${linkClass}`}>{p}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2.5">
                  <RiPrinterLine className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" aria-hidden />
                  <p className="tabular-nums">
                    <span className="text-gray-600">{C.faxLabel} : </span>
                    <span className="whitespace-nowrap">{C.fax}</span>
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <RiMailLine className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" aria-hidden />
                  <p>
                    <span className="sr-only">{C.emailLabel} : </span>
                    <a href={`mailto:${C.email}`} className={`break-all ${linkClass}`}>{C.email}</a>
                  </p>
                </div>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-5 border-t border-gray-300 pt-8 text-[16px] lg:flex-row lg:items-center lg:justify-between">
          <button
            type="button"
            onClick={openLanguageModal}
            aria-haspopup="dialog"
            className={`flex items-center gap-3 self-start rounded text-black hover:underline underline-offset-4 lg:self-auto ${focusRing}`}
          >
            <RiGlobalLine className="h-8 w-8" aria-hidden />
            {currentLang}
          </button>
          <div className="flex flex-col gap-3 text-[15px] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <nav aria-label={data.legalNav}>
              <ul className="flex flex-wrap gap-y-2">
                {data.legal.map((link) => (
                  <li key={link.href} className="border-l border-gray-400 px-3 first:border-l-0 first:pl-0">
                    <Link href={withLocale(locale, link.href)} className={linkClass}>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="text-gray-700">{data.copyright.replace("{year}", String(year))}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
