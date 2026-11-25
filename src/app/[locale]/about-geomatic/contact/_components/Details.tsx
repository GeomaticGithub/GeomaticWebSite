import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  RiArrowRightUpLine,
  RiMailLine,
  RiMapPin2Line,
  RiPhoneLine,
  RiPrinterLine,
} from "react-icons/ri";
import { getCommon } from "@/i18n/common";
import { focusRing, telHref, type ContactInfo, type ContactPageT } from "../constants";

const link = `text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`;

function Row({ Icon, label, children }: { Icon: IconType; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 py-4">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#0079c1]/[0.08] text-[#0079c1]"
        aria-hidden
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <dt className="text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-600">{label}</dt>
        <dd className="mt-1 text-[16px] leading-relaxed text-slate-900">{children}</dd>
      </div>
    </div>
  );
}

/** Card with the address, phones, fax and e-mail of the head office (next to the form). */
export default function Details({
  data,
  contact,
  locale,
}: {
  data: ContactPageT["details"];
  contact: ContactInfo;
  locale: string;
}) {
  const common = getCommon(locale);
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Geomatic, ${contact.address.join(", ")}`
  )}`;

  return (
    <aside
      aria-labelledby="contact-details-title"
      className="rounded-lg border border-slate-200 bg-white p-6 sm:p-7"
    >
      <h2 id="contact-details-title" className="text-[22px] font-semibold leading-snug text-slate-900">
        {data.title}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{data.text}</p>

      <dl className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
        <Row Icon={RiMapPin2Line} label={contact.addressLabel}>
          <address className="not-italic">
            {contact.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </Row>
        <Row Icon={RiPhoneLine} label={contact.phoneLabel}>
          <ul>
            {contact.phones.map((p) => (
              <li key={p}>
                <a href={telHref(p)} className={`whitespace-nowrap tabular-nums ${link}`}>
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </Row>
        <Row Icon={RiPrinterLine} label={contact.faxLabel}>
          <span className="whitespace-nowrap tabular-nums">{contact.fax}</span>
        </Row>
        <Row Icon={RiMailLine} label={contact.emailLabel}>
          <a href={`mailto:${contact.email}`} className={`break-all ${link}`}>
            {contact.email}
          </a>
        </Row>
      </dl>

      <a
        href={mapHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 border border-[#0079c1] px-5 py-3 text-[15px] font-semibold text-[#005e95] transition-colors hover:bg-[#0079c1]/[0.08] ${focusRing}`}
      >
        <RiMapPin2Line className="h-5 w-5" aria-hidden />
        {contact.mapLabel}
        <RiArrowRightUpLine className="h-4 w-4" aria-hidden />
        <span className="sr-only"> {common.opensInNewTab}</span>
      </a>
    </aside>
  );
}
