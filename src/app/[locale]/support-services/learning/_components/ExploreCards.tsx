import Link from "next/link";
import type { IconType } from "react-icons";
import { RiArrowRightLine, RiBookOpenLine, RiCalendarEventLine, RiPriceTag3Line } from "react-icons/ri";

export type ExploreCard = {
  title: string;
  /** "{count}" is replaced by the number of courses in the catalogue */
  desc?: string;
  badge?: string;
  link: string;
  cta?: string;
};

const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2";

/** The icon follows the page the card leads to. */
function iconFor(link: string): IconType {
  if (link.endsWith("/courses")) return RiBookOpenLine;
  if (link.endsWith("/schedule")) return RiCalendarEventLine;
  return RiPriceTag3Line;
}

/** Entry cards of the training pages: catalogue, schedule, quote. */
export default function ExploreCards({ cards, locale, courseCount }: { cards: ExploreCard[]; locale: string; courseCount: number }) {
  const cols = cards.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <ul className={`mt-10 grid gap-5 ${cols}`}>
      {cards.map((card) => {
        const Icon = iconFor(card.link);
        return (
          <li key={card.title}>
            <Link
              href={`/${locale}${card.link}`}
              className={`group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0079c1] text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                {card.badge && <span className="rounded-full bg-amber-100 px-3 py-1 text-[13px] font-semibold text-amber-900">{card.badge}</span>}
              </span>
              <span className="mt-5 block text-[22px] font-semibold leading-snug text-slate-900">{card.title}</span>
              {card.desc && <span className="mt-2 block text-[15px] leading-relaxed text-slate-700">{card.desc.replace("{count}", String(courseCount))}</span>}
              {card.cta && (
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                  {card.cta}
                  <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
