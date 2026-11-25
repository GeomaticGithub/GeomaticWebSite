import Link from "next/link";
import type { IconType } from "react-icons";
import {
  RiArrowRightLine,
  RiBriefcaseLine,
  RiCustomerService2Line,
  RiGraduationCapLine,
  RiMailLine,
  RiPhoneLine,
  RiPriceTag3Line,
  RiTeamLine,
} from "react-icons/ri";
import { focusRing, type ContactPageT } from "../constants";

const ICONS: Record<string, IconType> = {
  sales: RiPriceTag3Line,
  support: RiCustomerService2Line,
  phone: RiPhoneLine,
  consulting: RiTeamLine,
  training: RiGraduationCapLine,
  careers: RiBriefcaseLine,
};

/** "Reach the right team" grid: each card is one link (e-mail, phone or a page of the site). */
export default function Topics({
  data,
  locale,
}: {
  data: ContactPageT["topics"];
  locale: string;
}) {
  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-6 lg:py-20">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#005e95]">
            <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
            {data.kicker}
          </p>
          <h2 className="mt-4 text-[30px] font-bold leading-[1.1] text-slate-900 sm:text-[40px]">
            {data.title}
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-slate-700">{data.subtitle}</p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {data.cards.map((card) => {
            const Icon = ICONS[card.icon] ?? RiMailLine;
            const direct = card.link.startsWith("mailto:") || card.link.startsWith("tel:");
            const className = `group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}`;
            const body = (
              <>
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0079c1]/[0.08] text-[#0079c1] transition-colors group-hover:bg-[#0079c1] group-hover:text-white"
                  aria-hidden
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-[20px] font-semibold leading-snug text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{card.desc}</p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                  <span className={direct ? "break-all tabular-nums" : ""}>{card.cta}</span>
                  <RiArrowRightLine
                    className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden
                  />
                </span>
              </>
            );
            return (
              <li key={card.link}>
                {direct ? (
                  <a href={card.link} className={className}>
                    {body}
                  </a>
                ) : (
                  <Link href={`/${locale}${card.link}`} className={className}>
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
