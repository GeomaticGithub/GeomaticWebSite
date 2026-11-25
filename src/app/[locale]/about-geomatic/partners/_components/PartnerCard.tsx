// One partner: logo, name, what they do, the page of their solution on this site when there is one, and their own site.
// Used by the partners overview and by the three family pages.
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine } from "react-icons/ri";
import type { PartnerT } from "../constants";

const focusRing =
  "rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2";

export default function PartnerCard({
  partner: p,
  locale,
  siteLabel,
  solutionLabel,
  newTabNote,
}: {
  partner: PartnerT;
  locale: string;
  siteLabel: string;
  solutionLabel: string;
  newTabNote: string;
}) {
  return (
    <li className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)]">
      <div className="relative h-24 w-48 max-w-full">
        <Image src={p.image} alt="" fill sizes="192px" className="object-contain object-left" />
      </div>
      <h3 className="mt-5 text-[19px] font-semibold leading-snug text-slate-900">{p.title}</h3>
      {p.desc && <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{p.desc}</p>}
      {(p.solution || p.link) && (
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-5">
          {p.solution && (
            <Link
              href={`/${locale}${p.solution}`}
              className={`group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
            >
              {solutionLabel}
              <span className="sr-only"> : {p.title}</span>
              <RiArrowRightLine className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
            </Link>
          )}
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
            >
              {siteLabel}
              <span className="sr-only"> : {p.title}</span>
              <RiArrowRightUpLine className="h-4 w-4" aria-hidden />
              <span className="sr-only"> {newTabNote}</span>
            </a>
          )}
        </div>
      )}
    </li>
  );
}
